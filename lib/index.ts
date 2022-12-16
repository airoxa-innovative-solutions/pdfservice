import { getDocument } from "./PDFreport";
import { pdf, renderToFile } from "@react-pdf/renderer";
import fs from "fs";

const reportData = {
  _id: "639c681fab7976d6fa62874a",
  robotId: "telislap-8428af10-98c8-4741-839d-473a014dc2e2",
  department: "",
  distanceTraveled: 0,
  end: "2022-12-16T12:44:50.000Z",
  heatMapFile: "639c6842ab7976d6fa628752",
  interruptions: {},
  mapId: "639c623f49c0ebd1b71ac33b",
  room: "Current location",
  start: "2022-12-16T12:44:15.000Z",
  startedBy: "teshan",
  status: "complete",
  submittedBy: "teshan",
  type: "Remote controlled",
  uvcLightDuration: "00:00:13",
  taskDuration: "00:00:35",
  disinfectionPositions: {
    disinfectedPositions: [],
    remainingPositions: [],
    failedPositions: [],
  },
};

const mapSrc = "";

const pdfObj = pdf();
pdfObj.updateContainer(getDocument(reportData, mapSrc));

renderToFile(getDocument(reportData, mapSrc), "s.pdf");
/* pdfObj
  .toBuffer()
  .then((buffer: any) => {
    console.log("DEBUG: ", buffer);
    fs.writeFileSync("a.pdf", buffer);
    console.log("PDF saved.");
  })
  .catch((err) => {
    console.error(err);
  }); */
