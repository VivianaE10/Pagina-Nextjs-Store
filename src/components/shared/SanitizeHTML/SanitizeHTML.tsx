//componente de sanitizacion, proceso de sanitizacion si nos llegan etiquetas string oh alguna otra etiqueta que no queramos y lo remueve del string

import { createElement, HTMLAttributes } from "react";
import sanitize from "sanitize-html";

//creando props
type SanitizeHTMLProps = {
  children: string;
  tag: string;
} & HTMLAttributes<HTMLElement>;

export const SanitizeHTML = ({ tag, children, ...rest }: SanitizeHTMLProps) => {
  const sanitizedHTML = sanitize(children, {
    allowedTags: ["b", "i", "em", "strong"], //etiquetas que van a pasar en el proceso de sanitizacion oh limpieza del html
  });
  return createElement(tag, { ...rest }, sanitizedHTML);
};
