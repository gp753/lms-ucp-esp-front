import { ICON_REGISTRY_PROVIDER } from "@angular/material/icon";
import { FuseNavigation } from "@fuse/types";
import { title } from "process";

export const navigation: FuseNavigation[] = [
    //{
    //    id       : 'applications',
    //    title    : 'Applications',
    //    translate: 'NAV.APPLICATIONS',
    //    type     : 'group',
    //    children : [
    //        {
    //            id       : 'sample',
    //            title    : 'Sample',
    //            translate: 'NAV.SAMPLE.TITLE',
    //            type     : 'item',
    //            icon     : 'email',
    //            url      : '/sample',
    //            badge    : {
    //                title    : '25',
    //                translate: 'NAV.SAMPLE.BADGE',
    //                bg       : '#F44336',
    //                fg       : '#FFFFFF'
    //            }
    //        }
    //    ]
    //}

    //MENU ALUMNOS
    {
        id: "alumno",
        title: "Alumnos",
        type: "group",
        children: [
            {
                id: "libros",
                title: "Capacitaciones",
                type: "item",
                icon: "book",
                url: "/bienvenida-materia",
                // url: "/materias",
            },
            {
                id: "examenes",
                title: "Exámenes",
                type: "item",
                icon: "description",
                url: "/examenes",
            },
            {
                id: "calificaciones",
                title: "Calificaciones",
                type: "item",
                icon: "star",
                url: "/calificaciones",
            },
            {
                id: "comunicados",
                title: "Comunicados",
                type: "item",
                icon: "chat",
                url: "/comunicados",
            },
            {
                id: "certificados",
                title: "Certificados",
                type: "item",
                icon: "school",
                url: "/certificados",
            },
            {
                id: "ficha",
                title: "Ficha",
                type: "item",
                icon: "person",
                url: "/ficha",
            },
            // {
            //     id: "financiero",
            //     title: "Financiero",
            //     type: "item",
            //     icon: "money",
            //     url: "/financiero",
            // },
            // {
            //     id: "informacion-fundamental",
            //     title: "Información fundamental",
            //     type: "item",
            //     icon: "",
            //     url: "/informacion-fundamental",
            // },
        ],
    },
    //FIN MENU ALUMNOS

    //MENU PROFESORES
    {
        id: "profesores",
        title: "Profesores",
        type: "group",
        children: [
            {
                id: "profesor-materias",
                title: "Materias",
                type: "item",
                icon: "",
                url: "/profesor-materias",
            },
            {
                id: "profesor-reportes",
                title: "Reportes",
                type: "item",
                icon: "",
                url: "/profesor-reportes",
            },
            // {
            //     id: "trabajos-practicos",
            //     title: "Trabajos Practicos",
            //     type: "item",
            //     icon: "",
            //     url: "/trabajos-practicos",
            // },
            //  {
            //      id: "cargar-contenido",
            //      title: "Cargar Contenido",
            //      type: "item",
            //      icon: "",
            //      url: "/cargar-contenido",
            //  },
        ],
    },
    //FIN MENU PROFESORES

    //MENU ADMINISTRADORES
    {
        id: "administradores",
        title: "ADMINISTRADORES",
        type: "group",
        children: [
            {
                id: "gestion-academica-menu",
                title: "Gestion Academica",
                type: "group",
                children: [
                    {
                        id: "administrador-unidades",
                        title: "Materias",
                        type: "item",
                        icon: "",
                        url: "/administrador-unidades",
                    },
                    {
                        id: "grupos",
                        title: "Grupos",
                        type: "item",
                        icon: "",
                        url: "/administrador-grupos",
                    },
                    {
                        id: "administrador-cargar-examen",
                        title: "Examenes",
                        type: "item",
                        icon: "",
                        url: "/administrador-cargar-examen",
                    },
                    {
                        id: "",
                        title: "Seguimiento",
                        type: "collapsable",
                        children: [
                            {
                                id: "administrador-seguimiento",
                                title: "Notificaciones",
                                type: "item",
                                icon: "",
                                url: "/administrador-seguimiento",
                            },
                            {
                                id: "administrador-reportes",
                                title: "Reportes",
                                type: "item",
                                icon: "",
                                url: "/administrador-reportes",
                            },
                        ],
                    },
                ],
            },
            {
                id: "administrador-menu-usuarios",
                title: "Usuarios",
                type: "group",
                children: [
                    {
                        id: "administrador-registrar-alumno",
                        title: "Registrar Alumno",
                        type: "item",
                        icon: "",
                        url: "/administrador-registrar-alumno",
                    },
                    {
                        id: "administrador-alumnos",
                        title: "Alumnos",
                        type: "item",
                        icon: "",
                        url: "/administrador-alumnos",
                    },
                    {
                        id: "administrador-profesores",
                        title: "Profesores",
                        type: "item",
                        icon: "",
                        url: "/administrador-profesores",
                    },
                    {
                        id: "administrador-clientes",
                        title: "Clientes",
                        type: "item",
                        icon: "",
                        url: "/administrador-clientes",
                    },
                    {
                        id: "administrador-crear-usuario",
                        title: "Usuarios",
                        type: "item",
                        icon: "",
                        url: "/administrador-crear-usuario",
                    },
                    {
                        id: "administrador-roles",
                        title: "Roles",
                        type: "item",
                        icon: "",
                        url: "/administrador-roles",
                    },
                    {
                        id: "administrador-permisos",
                        title: "Permisos",
                        type: "item",
                        icon: "",
                        url: "/administrador-permisos",
                    },
                ],
            },

            {
                id: "comunicacion-menu",
                title: "Comunicacion",
                type: "group",
                children: [
                    {
                        id: "foro",
                        title: "Foro",
                        type: "item",
                        icon: "",
                        url: "/foro",
                    },
                    {
                        id: "administrador-encuestas",
                        title: "Encuestas",
                        type: "item",
                        icon: "",
                        url: "/administrador-encuestas",
                    },
                    {
                        id: "administrador-resultados-encuestas",
                        title: "Resultados encuestas",
                        type: "item",
                        icon: "",
                        url: "/administrador-resultados-encuestas",
                    },
                    {
                        id: "admin-comunicados",
                        title: "Comunicados",
                        type: "item",
                        icon: "",
                        url: "/admin-comunicados",
                    },
                ],
            },
            {
                id: "documentos-menu",
                title: "Documentos",
                type: "group",
                children: [
                    {
                        id: "administrador-firmas",
                        title: "Firmas",
                        type: "item",
                        icon: "",
                        url: "/administrador-firmas",
                    },
                    {
                        id: "administrador-certificados",
                        title: "Certificados",
                        type: "item",
                        icon: "",
                        url: "/admin-certificados",
                    },
                    {
                        id: "configuracion-de-certificado",
                        title: "Configuracion de Certificados",
                        type: "item",
                        icon: "",
                        url: "/admin-configuracion-de-certificado",
                    },
                ],
            },
            {
                id: "finanzas-menu",
                title: "Finanzas",
                type: "group",
                children: [
                    {
                        id: "",
                        title: "Financiamiento",
                        type: "collapsable",
                        children: [
                            {
                                id: "tipo-financiamiento",
                                title: "Tipo financiamiento",
                                type: "item",
                                icon: "",
                                url: "/tipo-financiamiento",
                            },
                            {
                                id: "financiamiento",
                                title: "Financiamiento",
                                type: "item",
                                icon: "",
                                url: "/financiamiento",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    //FIN MENU ADMINISTRADORES

    // MENU CLIENTE
    {
        id: "cliente",
        title: "Cliente",
        type: "group",
        children: [
            {
                id: "administrador-reportes",
                title: "Reportes",
                type: "item",
                icon: "",
                url: "/cliente-reportes",
            },
        ],
    },
    // FIN MENU CLIENTE

    // MENU SEGUIMIENTO
    {
        id: "seguimiento",
        title: "Seguimiento",
        type: "group",
        children: [
            {
                id: "administrador-seguimiento",
                title: "Notificacion",
                type: "item",
                icon: "",
                url: "/seguimiento",
            },
            {
                id: "administrador-certificados",
                title: "Certificados",
                type: "item",
                icon: "",
                url: "/admin-certificados",
            },
            {
                id: "administrador-reportes",
                title: "Reportes",
                type: "item",
                icon: "",
                url: "/administrador-reportes",
            },
        ],
    },

    // FIN MENU SEGUIMIENTO
];
