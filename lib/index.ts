import { getDocument } from "./PDFreport";
import { pdf } from "@react-pdf/renderer";

const reportData = {};

const mapSrc = "";

const pdfObj = pdf();
pdfObj.container(getDocument(reportData, mapSrc));

pdfObj
  .toBuffer()
  .then(() => {
    console.log("PDF saved.");
  })
  .catch((err) => {
    console.error(err);
  });
