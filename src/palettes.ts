import { ColorPalette } from './types';

export const rawPalette = (() => {
  // background
  const red = new Array(256).fill(102);
  const green = new Array(256).fill(102);
  const blue = new Array(256).fill(102);
  const alpha = new Array(256).fill(0);

  // Transform different shade of black color
  for (let i = 0; i <= 20; i++) {
    red[i] = 240;
    green[i] = 228;
    blue[i] = 0;
  }

  for (let i = 21; i <= 40; i++) {
    red[i] = 244;
    green[i] = 153;
    blue[i] = 67;
  }

  for (let i = 41; i <= 60; i++) {
    red[i] = 234;
    green[i] = 113;
    blue[i] = 113;
  }

  for (let i = 61; i <= 80; i++) {
    red[i] = 204;
    green[i] = 30;
    blue[i] = 26;
  }

  for (let i = 81; i <= 254; i++) {
    red[i] = 152;
    green[i] = 31;
    blue[i] = 52;
  }

  return {
    red,
    green,
    blue,
    alpha,
  } as ColorPalette;
})();

export const exposurePalette = (() => {
  // background
  const red = new Array(256).fill(102);
  const green = new Array(256).fill(102);
  const blue = new Array(256).fill(102);
  const alpha = new Array(256).fill(255);

  // Transform different shade of black color
  for (let i = 0; i <= 50; i++) {
    red[i] = 152;
    green[i] = 31;
    blue[i] = 52;
    alpha[i] = 255;
  }

  for (let i = 51; i <= 101; i++) {
    red[i] = 204;
    green[i] = 30;
    blue[i] = 26;
    alpha[i] = 255;
  }

  for (let i = 102; i <= 152; i++) {
    red[i] = 234;
    green[i] = 113;
    blue[i] = 113;
    alpha[i] = 255;
  }

  for (let i = 153; i <= 203; i++) {
    red[i] = 244;
    green[i] = 153;
    blue[i] = 67;
    alpha[i] = 255;
  }

  for (let i = 204; i <= 254; i++) {
    red[i] = 240;
    green[i] = 228;
    blue[i] = 0;
    alpha[i] = 255;
  }

  return {
    red,
    green,
    blue,
    alpha,
  } as ColorPalette;
})();
