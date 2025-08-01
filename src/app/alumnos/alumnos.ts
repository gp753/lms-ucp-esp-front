export interface Alumnos {}

export interface Comentario {
    Autor?: string;
    texto?: string;
}

export interface Hilo {
    cantidadPublicaciones?: number;
    descripcion?: string;
    nombre?: string;
}

// lo nuevo
export interface MateriaAlumno {
    ID: number;
    LINK_IMAGEN: string;
    NOMBRE: string;
}

export interface UnidadesMateriaAlumno {
    linK_EDUCAPLAY: string;
    ID: number;
    LINK_MANUAL: string;
    NOMBRE: string;
    ORDEN: number;
    LINK_EDUCAPLAY: string;
    mostrar: boolean;
}

export interface SubUnidadesAlumno {
    CORRECTA: number;
    ID: number;
    LINK_VIDEO: string;
    PREGUNTA: string;
    RESPUESTA1: string;
    RESPUESTA2: string;
    TEXTO: string;
    TITULO: string;
    stepCompletado?: boolean;
    arrayRespuestas?: any;
    videoSeguro?: any;
}

export interface ExamenesAlumno {}
