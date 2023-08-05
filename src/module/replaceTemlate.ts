import { Product } from "../types/types";

const templateFunction = (template: string, data: Product): string => {
  template = template.replaceAll("{%IMAGE%}", data.image);
  template = template.replaceAll("{%PRODUCTNAME%}", data.productName);
  template = template.replaceAll(
    "{%ORGANIC%}",
    data.organic ? "not-organic" : ""
  );
  template = template.replaceAll("{%QUANTITY%}", data.quantity);
  template = template.replaceAll("{%PRICE%}", data.price + "");
  template = template.replaceAll("{%ID%}", data.id + "");
  template = template.replaceAll("{%FROM%}", data.from);
  template = template.replaceAll("{%NUTRICIAN%}", data.nutrients);
  return template;
};

export default templateFunction;
