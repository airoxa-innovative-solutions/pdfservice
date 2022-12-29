export enum ExposureType {
  UvdExposure = 'uvdExposure',
  ScaleTwo = 'scaleTwo',
  Dosimeter100 = 'dosimeter100',
  Pathogens = 'pathogens',
  RawExposure = 'rawExposure',
}

type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};

export interface ColorPalette {
  red: Tuple<number, 101>;
  green: Tuple<number, 101>;
  blue: Tuple<number, 101>;
  alpha: Tuple<number, 101>;
}
