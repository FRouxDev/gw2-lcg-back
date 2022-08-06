export interface XMLCardProperty {
  _name: string;
  _value: string;
}

export interface XMLCardDto {
  _id: string;
  _name: string;
  _size: string;
  alternate?: any;
  property: XMLCardProperty[];
}
