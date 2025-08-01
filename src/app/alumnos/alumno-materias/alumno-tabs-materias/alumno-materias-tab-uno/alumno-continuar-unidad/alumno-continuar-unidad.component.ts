import {
    ChangeDetectorRef,
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FusePerfectScrollbarDirective } from "@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive";
import { AdministradorService } from "app/administradores/administrador.service";
import { SubunidadesAdmin } from "app/administradores/administradores";
import { SubUnidadesAlumno } from "app/alumnos/alumnos";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";
import { stream } from "xlsx";
interface AudioData {
    blob?: Blob;
    url?: string;
    status: "draft" | "submitted";
    recording: boolean;
    chunks: BlobPart[];
    mediaRecorder?: MediaRecorder;
    audioEl?: HTMLAudioElement;
    playing?: boolean;
    duration?: number;
    currentTime?: number;
    progress?: number; // 0..1
    rafId?: number;
}
// parche rápido: evita errores de tipo, no es tan estricto
declare var MediaRecorder: any;
type BlobEvent = any;

@Component({
    selector: "academy-course",
    templateUrl: "./alumno-continuar-unidad.component.html",
    styleUrls: ["./alumno-continuar-unidad.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AlumnoContinuarUnidadComponent implements OnInit, OnChanges {
    step1: FormGroup;
    step2: FormGroup;
    step3: FormGroup;

    id_materia: any;

    subunidades: SubUnidadesAlumno[] = [];
    pos: number;

    animationDirection: "left" | "right" | "none";
    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    mobile: boolean = false;

    respuestaSeleccionada = null;

    arrayRespuestas = [
        { respuestaSeleccionada: null, texto: null, correcta: null },
        { respuestaSeleccionada: null, texto: null, correcta: null },
    ];

    // sirve para cheackear si vio el video o no (es solo un timer de 5 segundos)
    vioVideo: boolean;
    //VARIABLES PARA GRABACION DE AUDIO
    // Solo el estudiante graba; el profesor viene con audio pregrabado
    studentAudio: AudioData = {
        status: "draft",
        recording: false,
        chunks: [],
        playing: false,
        currentTime: 0,
        progress: 0,
        duration: 0,
    };

    professorAudio: AudioData = {
        status: "submitted",
        recording: false,
        chunks: [],
        url: "",
        playing: false,
        currentTime: 0,
        progress: 0,
        duration: 0,
    };

    constructor(
        private _formBuilder: FormBuilder,
        private route: Router,
        private adminService: AdministradorService,
        private sanitizer: DomSanitizer,
        private _changeDetectorRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private alumnoService: AlumnosService
    ) {
        this.animationDirection = "none";
        this.pos = 0;

        activatedRoute.params.subscribe((x) => {
            // console.log(x);
            this.getSubUnidad(x.id_unidad);
            this.id_materia = x.id_materia;
        });
    }

    ngOnChanges() {
        if (window.screen.width <= 959) {
            this.mobile = true;
        }
    }

    ngOnInit(): void {
        console.log("valor inicial", this.vioVideo);

        this.checkVioVideo();

        // profesor tiene audio ya enviado
        // inicializar audio fake del profesor
        // inicializar audio fake del profesor
        // inicializar audio fake del profesor
        const fakeProfessorBlob = this.createSilentAudio(1500);
        this.professorAudio.blob = fakeProfessorBlob;
        this.professorAudio.url = URL.createObjectURL(fakeProfessorBlob);
        this.setupAudioElement("professor");
    }

    getSubUnidad(id_unidad) {
        Swal.fire("Cargando");
        Swal.showLoading();

        this.alumnoService.getSubUnidades(id_unidad).subscribe((data: any) => {
            data.push({
                arrayRespuestas: data[0].arrayRespuestas,
                stepCompletado: true,
                CORRECTA: 1,
                ID: 999,
                PREGUNTA: data[0].PREGUNTA,
                RESPUESTA1: data[0].RESPUESTA1,
                RESPUESTA2: data[0].RESPUESTA2,
                TEXTO: "Expresion Oral",
                TITULO: "Expresion Oral",
                LINK_VIDEO: data[0].LINK_VIDEO,
            });
            this.subunidades = data.reverse();

            for (let s of this.subunidades) {
                this.subunidades.map((x) => {
                    // console.log("s", s.LINK_VIDEO);
                    // console.log("x", x.LINK_VIDEO);
                    x.stepCompletado = false;
                    x.videoSeguro =
                        this.sanitizer.bypassSecurityTrustResourceUrl(
                            x.LINK_VIDEO
                        );
                    x.arrayRespuestas = [
                        {
                            respuestaSeleccionada: null,
                            texto: x.RESPUESTA1,
                            correcta: 1,
                        },
                        {
                            respuestaSeleccionada: null,
                            texto: x.RESPUESTA2,
                            correcta: 2,
                        },
                    ];
                });

                console.log(this.subunidades);
            }

            // console.log(this.subunidades);

            Swal.close();
        });
    }

    // ejemplosLlamadas() {
    //     this.loading("Cargando..");
    //     this.adminService
    //         .listarSubUnidades(this.id_unidad)
    //         .subscribe((result) => {
    //             Swal.close();
    //             this.unidades = result;

    //             console.log(this.unidades);

    //             this.unidades.map((x) => {
    //                 x.stepCompletado = false;

    //                 for (let z of x.pregunta.respuestas) {
    //                     z.respuestaSeleccionada = null;
    //                 }
    //             });

    //             console.log("este quiero", this.unidades);

    //             for (let unidad of this.unidades) {
    //                 if (unidad.videoUrl) {
    //                     if (unidad.videoUrl.length > 0) {
    //                         unidad.safevideoUrl =
    //                             this.sanitizer.bypassSecurityTrustResourceUrl(
    //                                 unidad.videoUrl
    //                             );
    //                     } else {
    //                         unidad.safevideoUrl = null;
    //                     }
    //                 } else {
    //                     unidad.safevideoUrl = null;
    //                 }
    //             }
    //         });
    // }

    /**
     * Go to step
     *
     * @param step
     */

    gotoStep(index): void {
        let stepAnterior = this.subunidades[index - 1];

        if (index > this.pos && stepAnterior.stepCompletado === true) {
            // Decide the animation direction
            this.animationDirection = this.pos < index ? "left" : "right";

            // Run change detection so the change
            // in the animation direction registered
            this._changeDetectorRef.detectChanges();

            // Set the current step
            this.pos = index;
        } else if (index < this.pos) {
            // Decide the animation direction
            this.animationDirection = this.pos < index ? "left" : "right";

            // Run change detection so the change
            // in the animation direction registered
            this._changeDetectorRef.detectChanges();

            // Set the current step
            this.pos = index;
        }
    }

    loading(titulo) {
        Swal.fire({
            title: titulo,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });
    }

    seleccionada(valor) {
        console.log(valor);
        this.respuestaSeleccionada = valor;
    }

    modalRespuesta(subunidad) {
        let correcta = subunidad.CORRECTA;

        console.log("pos", this.pos);
        console.log("length", this.subunidades.length - 1);

        if (this.respuestaSeleccionada === correcta) {
            Swal.fire(
                "Felicidades",
                "La respuesta es correcta",
                "success"
            ).then(() => {
                if (this.pos < this.subunidades.length - 1) {
                    this.pos++;

                    this.checkVioVideo();
                } else if (this.pos === this.subunidades.length - 1) {
                    Swal.fire("Cargando nueva unidad...");
                    Swal.showLoading();

                    let ordenActual = +localStorage.getItem("orden");

                    this.alumnoService
                        .getUnidades(this.id_materia)
                        .subscribe((data: any) => {
                            for (let x of data) {
                                if (x.orden === ordenActual + 1) {
                                    this.pos = 0;

                                    this.route.navigate([
                                        "/continuar-unidad",
                                        this.id_materia,
                                        x.id,
                                    ]);
                                } else {
                                    Swal.fire(
                                        "Felicidades",
                                        "Has finalizado todas las unidades",
                                        "success"
                                    ).then(() => {
                                        this.route.navigate([
                                            "/tabs-materias",
                                            this.id_materia,
                                        ]);
                                    });
                                }
                            }
                        });
                }
            });

            subunidad.stepCompletado = true;

            console.log("Esta es la sub ", subunidad);

            let avance = {
                ID_SUBUNIDAD: subunidad.ID,
                VIDEO: true,
                PREGUNTA: true,
            };

            this.alumnoService.guardarAvance(avance).subscribe((data) => {});
        } else {
            Swal.fire(
                "Fallaste",
                "Tu respuesta esta equivocada, puedes revisar el material o preguntar a los profesores para aclarar tus dudas.",
                "error"
            );
        }
    }

    checkVioVideo() {
        this.vioVideo = false;
        console.log("entro a check", this.vioVideo);
        setTimeout(() => {
            this.vioVideo = true;

            console.log("ya vio el video", this.vioVideo);
        }, 5000);
    }

    // ------------------ util: crear audio fake para el profesor ------------------
    createSilentAudio(durationMs = 1000): Blob {
        const sampleRate = 44100;
        const numSamples = (sampleRate * durationMs) / 1000;
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);
        const writeString = (offset: number, str: string) => {
            for (let i = 0; i < str.length; i++)
                view.setUint8(offset + i, str.charCodeAt(i));
        };
        writeString(0, "RIFF");
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(8, "WAVE");
        writeString(12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, "data");
        view.setUint32(40, numSamples * 2, true);
        return new Blob([view], { type: "audio/wav" });
    }

    // ------------------ acceso a micrófono ------------------
    private getMediaStream(): Promise<MediaStream> {
        return navigator.mediaDevices.getUserMedia({ audio: true });
    }

    // ------------------ grabación del alumno ------------------
    async startRecording() {
        if (this.studentAudio.recording) return;

        if (!("MediaRecorder" in window)) {
            Swal.fire("Error", "Tu navegador no soporta grabación de audio.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const recorder: any = new (window as any).MediaRecorder(stream); // fallback sin tipos estrictos

            this.studentAudio.chunks = [];
            this.studentAudio.mediaRecorder = recorder;

            recorder.ondataavailable = (e: any) => {
                if (e.data && e.data.size > 0) {
                    this.studentAudio.chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(this.studentAudio.chunks, {
                    type: "audio/webm",
                });
                this.studentAudio.blob = blob;
                if (this.studentAudio.url) {
                    URL.revokeObjectURL(this.studentAudio.url);
                }
                this.studentAudio.url = URL.createObjectURL(blob);
                this.studentAudio.recording = false;
                this.setupAudioElement("student");
                this._changeDetectorRef.detectChanges();
            };

            recorder.start();
            this.studentAudio.recording = true;
            this._changeDetectorRef.detectChanges();
        } catch (err) {
            console.error("Error accediendo al micrófono", err);
            Swal.fire("Error", "No se pudo acceder al micrófono.", "error");
        }
    }

    stopRecording() {
        if (this.studentAudio.mediaRecorder && this.studentAudio.recording) {
            this.studentAudio.mediaRecorder.stop();
            this.studentAudio.recording = false;
            this.studentAudio.mediaRecorder.stream
                ?.getTracks()
                .forEach((t: any) => t.stop());
        }
    }

    // ------------------ reproducción y control ------------------
    private setupAudioElement(who: "student" | "professor") {
        const target =
            who === "student" ? this.studentAudio : this.professorAudio;
        if (!target.url) return;

        if (target.audioEl) {
            target.audioEl.pause();
            target.audioEl.currentTime = 0;
            if (target.rafId) {
                cancelAnimationFrame(target.rafId);
            }
        } else {
            target.audioEl = new Audio(target.url);
        }

        target.audioEl.src = target.url!;
        target.audioEl.preload = "metadata";

        target.audioEl.onloadedmetadata = () => {
            const dur = target.audioEl!.duration;
            target.duration = isFinite(dur) ? dur : 0;
            target.currentTime = 0;
            target.progress = 0;
            this._changeDetectorRef.detectChanges();
        };

        target.audioEl.ontimeupdate = () => {
            target.currentTime = isFinite(target.audioEl!.currentTime)
                ? target.audioEl!.currentTime
                : 0;
            if (target.duration && isFinite(target.duration)) {
                target.progress = target.currentTime! / target.duration!;
            } else {
                target.progress = 0;
            }
            this._changeDetectorRef.detectChanges();
        };

        target.audioEl.onended = () => {
            target.playing = false;
            if (target.rafId) {
                cancelAnimationFrame(target.rafId);
            }
            target.currentTime = target.duration;
            target.progress = 1;
            this._changeDetectorRef.detectChanges();
        };
    }

    togglePlay(who: "student" | "professor") {
        const target =
            who === "student" ? this.studentAudio : this.professorAudio;
        if (!target.url) return;
        this.setupAudioElement(who);
        if (!target.audioEl) return;

        if (target.playing) {
            target.audioEl.pause();
            target.playing = false;
            if (target.rafId) {
                cancelAnimationFrame(target.rafId);
            }
        } else {
            target.audioEl.play();
            target.playing = true;
            this.updateFrame(who);
        }
        this._changeDetectorRef.detectChanges();
    }

    private updateFrame(who: "student" | "professor") {
        const target =
            who === "student" ? this.studentAudio : this.professorAudio;
        if (!target.audioEl) return;

        target.currentTime = isFinite(target.audioEl.currentTime)
            ? target.audioEl.currentTime
            : 0;
        target.duration = isFinite(target.audioEl.duration)
            ? target.audioEl.duration
            : 0;
        target.progress = target.duration
            ? target.currentTime! / target.duration!
            : 0;

        if (target.playing) {
            target.rafId = requestAnimationFrame(() => this.updateFrame(who));
        }
        this._changeDetectorRef.detectChanges();
    }

    seek(event: MouseEvent, who: "student" | "professor") {
        const target =
            who === "student" ? this.studentAudio : this.professorAudio;
        if (!target.audioEl) return;

        const wrapper = (event.currentTarget as HTMLElement).querySelector(
            ".progress-base"
        ) as HTMLElement;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const clickX = event.offsetX;
        const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);

        target.audioEl.currentTime = (target.duration || 0) * ratio;
        target.currentTime = target.audioEl.currentTime;
        target.progress = ratio;
        this._changeDetectorRef.detectChanges();
    }

    formatTime(sec: number = 0): string {
        if (!isFinite(sec) || sec < 0) return "0:00";
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    // ------------------ acciones del alumno ------------------
    sendStudentAudio() {
        if (!this.studentAudio.url) return;
        this.studentAudio.status = "submitted";
        this.setupAudioElement("student");
        this._changeDetectorRef.detectChanges();
    }

    resetStudent() {
        if (this.studentAudio.url) {
            URL.revokeObjectURL(this.studentAudio.url);
        }
        this.studentAudio.blob = undefined;
        this.studentAudio.url = undefined;
        this.studentAudio.status = "draft";
        this.studentAudio.chunks = [];
        this.studentAudio.recording = false;
        this.studentAudio.playing = false;
        this.studentAudio.currentTime = 0;
        this.studentAudio.progress = 0;
        if (this.studentAudio.audioEl) {
            this.studentAudio.audioEl.pause();
            this.studentAudio.audioEl = undefined;
        }
        this._changeDetectorRef.detectChanges();
    }
}
