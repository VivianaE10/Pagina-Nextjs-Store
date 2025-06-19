//componente de sanitizacion, proceso de sanitizacion si nos llegan etiquetas string oh alguna otra etiqueta que no queramos y lo remueve del string
"use client";
import { createElement, HTMLAttributes } from "react";
import sanitize from "sanitize-html";

//creando props HTMLAttributes se usa para permitir props como className, id, etc.
type SanitizeHTMLProps = {
  children: string; // El contenido HTML crudo como texto
  tag: string; // Qué etiqueta HTML quieres usar (p. ej. "div", "span")
} & HTMLAttributes<HTMLElement>;

export const SanitizeHTML = ({ tag, children, ...rest }: SanitizeHTMLProps) => {
  const sanitizedHTML = sanitize(children, {
    //sanitize limpia el HTML que viene como texto.
    allowedTags: ["b", "i", "em", "strong"], //etiquetas que van a pasar en el proceso de sanitizacion oh limpieza del html
  });
  return createElement(tag, { ...rest }, sanitizedHTML);
};
