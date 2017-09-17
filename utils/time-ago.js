import React from 'react';
import ms from 'ms';

const map = {
  s: 'segundos',
  ms: 'milisegundo',
  m: 'minutos',
  h: 'horas',
  d: 'días',
};

export default (date) => (
  ms(new Date - date)
  .replace(/[a-z]+/, (str) => ' ' + map[str])
)
