export interface Administradores {}
export interface NuevaMateria {
    nombre?: string;
    semestre?: string;
    cantidadUnidades?: number;
    id_carrera?: string;
    imagenUrl?: any;
}

export interface Carrera {
    id?: string;
    nombre?: string;
    cantidadSemestres?: number;
}

export interface SubUnidadEditar {
    id?: string;
    contenido?: string;
    estado?: string;
    nombre?: string;
    subunidad?: string;
    videoUrl?: string;
    pregunta?: PreguntaSubunidad;
}

export interface RespuestaSubunidad {
    id?: string;
    texto?: string;
    correcta?: boolean;
    respuestaSeleccionada?: any;
}

export interface PreguntaSubunidad {
    titulo?: string;
    respuestas?: RespuestaSubunidad[];
}

// LO NUEVO
export interface Usuarios {
    DOCUMENTO: number;
    EMAIL: string;
    NOMBRE: string;
    APELLIDO: string;
    ID: number;
    ID_ROL: number;
    ROL: string;
    CLIENTES: any;
}

export interface Rol {
    NOMBRE: string;
    ID: number;
}
export interface MateriasAdmin {
    ID: number;
    NOMBRE: string;
    LINK_IMAGEN: string;
}

export interface UnidadesMateriaAdmin {
    ID: number;
    ID_MATERIA: number;
    LINK_MANUAL: string;
    MATERIA: string;
    NOMBRE: string;
    ORDEN: number;
    PUBLICADO: boolean;
    LINK_EDUCAPLAY: string;
    mostrar: boolean;
}

export interface SubunidadesAdmin {
    TITULO: string;
    TEXTO: string;
    LINK_VIDEO: string;
    PREGUNTA: string;
    RESPUESTA1: string;
    RESPUESTA2: string;
    CORRECTA: number;
    ID_UNIDAD: number;
}
