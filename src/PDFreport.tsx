import React from 'react';
import { pdf, Document, Page, Image, Text, StyleSheet, View, Font, Svg, Path } from '@react-pdf/renderer';
// import { getImageUrlFromImageData } from '@blue-ocean-robotics/seto_utils';
// import { saveAs } from "file-saver";
import { useIntl, IntlProvider, FormattedMessage } from 'react-intl';
import flatten from 'flat';
import Messages from './DisinfectionReport.messages';
import { styles } from './styles';
import { FailedPositionIcon, DisinfectedPositionIcon, RemainingPositionIcon } from './PositionIcons';
import moment from 'moment';
import { capitalize } from 'lodash';
import locales from './locales';
const getMongoRobotName = (name: string) => {
  return name.split('-')[0];
};

const interruptionKeys = [
  'interruptionsInternalError' as const,
  'interruptionsLowBattery' as const,
  'interruptionsFunctionButton' as const,
  'interruptionsResetButton' as const,
  'interruptionsHeatDetection' as const,
  'interruptionsWalkDetection' as const,
  'interruptionsPersonDetection' as const,
  'interruptionsConnectionUnstable' as const,
  'interruptionsConnectionClosed' as const,
  'interruptionsTabletPermission' as const,
  'interruptionsTabletMovement' as const,
  'interruptionsFromUI' as const,
  'interruptionsLocalizationLoss' as const,
  'interruptionsRobotStuck' as const,
];
const shouldRender = (value: string) => value && parseInt(value, 10) > 0;

const messages: any = {
  de: locales.de,
  en: locales.en,
  da: locales.da,
  ar: locales.ar,
  zh: locales.zh,
};
// Documentation in https://react-pdf.org/components
const getDocument = (reportData: any, mapSrc?: string | undefined) => {
  return (
    <IntlProvider locale="en" defaultLocale="en" messages={flatten(messages.en)}>
      <Document>
        <Page style={styles.page} size="A4">
          <View style={styles.headerContainer} fixed>
            <View style={styles.mainHeaderWrapper}>
              <Text style={styles.mainHeader}>Disinfection Report</Text>
              <Image src="./assets/img/uvd-logo.png" style={styles.headerLogo} />
            </View>
            <View style={styles.column}>
              <View style={styles.disinfectionStatus}>
                <Image
                  src={
                    reportData.status === 'complete'
                      ? './assets/icons/check.png'
                      : './assets/icons/incompleteStatus.png'
                  }
                  style={styles.disinfectionStatusLogo}
                />
                <View style={styles.disinfectionStatusWrapper}>
                  <Text>Disinfection {reportData.status}</Text>
                </View>
              </View>
              <View style={styles.headerInfoContainer}>
                <View style={styles.headerInfoWrapper}>
                  <Text>
                    <Text style={styles.boldText}>Robot name:</Text> {getMongoRobotName(reportData.robotId)}
                  </Text>
                  <Text>
                    <Text style={styles.boldText}>Date:</Text> {moment(reportData.end).format('DD MMMM YYYY')}
                  </Text>
                </View>
                <View style={styles.headerInfoWrapper}>
                  {reportData.room !== '' ? (
                    <Text>
                      <Text style={styles.boldText}>Room:</Text> {reportData.room}
                    </Text>
                  ) : (
                    ''
                  )}
                  {reportData.department !== '' ? (
                    <Text>
                      <Text style={styles.boldText}>Department:</Text> {reportData.department}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>
              </View>
            </View>
          </View>

          {mapSrc && !reportData?.mapError ? (
            <View style={styles.mapImageContainer} fixed>
              <Image src={mapSrc} style={styles.mapImage} />
              <View style={styles.mapLegendWrapper}>
                <View style={styles.row}>
                  <Text style={styles.mapLegendHeader}>UV Irradiation exposure</Text>
                </View>
                <View style={styles.row}>
                  <View style={styles.mapLegendColor100}></View>
                  <Text style={styles.mapLegendText}>100</Text>
                </View>
                <View style={styles.row}>
                  <View style={styles.mapLegendColor75}></View>
                  <Text style={styles.mapLegendText}>75</Text>
                </View>
                <View style={styles.row}>
                  <View style={styles.mapLegendColor50}></View>
                  <Text style={styles.mapLegendText}>50</Text>
                </View>
                <View style={styles.row}>
                  <View style={styles.mapLegendColor25}></View>
                  <Text style={styles.mapLegendText}>25</Text>
                </View>
                <View style={styles.row}>
                  <View style={styles.mapLegendColor0}></View>
                  <Text style={styles.mapLegendText}>0 mJ/cm²</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.emptyMapContainer} fixed>
              <Text style={styles.emptyMapTextHeader}>{reportData?.mapError?.header}</Text>
              <Text style={styles.emptyMapTextDescription}>{reportData?.mapError?.description}</Text>
            </View>
          )}

          <Text style={styles.detailsTxt}>DETAILS:</Text>

          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.disinfectionType} />
              </Text>
              <Text style={styles.listItemValue}>{reportData.type}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.status} />
              </Text>
              <Text style={styles.listItemValue}>{capitalize(reportData.status)}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.startedBy} />
              </Text>
              <Text style={styles.listItemValue}>{reportData.startedBy}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.submittedBy} />
              </Text>
              <Text style={styles.listItemValue}>{reportData.submittedBy}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.taskStarted} />
              </Text>
              <Text style={styles.listItemValue}>{moment(reportData.start).format('DD-MM-YY HH:mm')}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.taskEnded} />
              </Text>
              <Text style={styles.listItemValue}>{moment(reportData.end).format('DD-MM-YY HH:mm')}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.uvcLightDuration} />
              </Text>
              <Text style={styles.listItemValue}>{reportData.uvcLightDuration}</Text>
            </View>
            {reportData.type === 'Predefined' && !reportData?.mapError ? (
              <View style={styles.listItem}>
                <Text style={styles.listItemHeader}>
                  <FormattedMessage {...Messages.positionsDisinfected} />
                </Text>
                <Text style={styles.listItemValue}>{reportData.disinfectionPositions.disinfectedPositions.length}</Text>
              </View>
            ) : (
              ''
            )}
            {reportData.type === 'Predefined' && !reportData?.mapError ? (
              <View style={styles.listItem}>
                <Text style={styles.listItemHeader}>
                  <FormattedMessage {...Messages.positionsRemaining} />
                </Text>
                <Text style={styles.listItemValue}>{reportData.disinfectionPositions.remainingPositions.length}</Text>
              </View>
            ) : (
              ''
            )}
            {reportData.type === 'Predefined' && !reportData?.mapError ? (
              <View style={styles.listItem}>
                <Text style={styles.listItemHeader}>
                  <FormattedMessage {...Messages.positionsFailed} />
                </Text>
                <Text style={styles.listItemValue}>{reportData.disinfectionPositions.failedPositions.length}</Text>
              </View>
            ) : (
              ''
            )}
            <View style={styles.listItem}>
              <Text style={styles.listItemHeader}>
                <FormattedMessage {...Messages.taskDuration} />
              </Text>
              <Text style={styles.listItemValue}>{reportData.taskDuration}</Text>
            </View>
            {interruptionKeys.map(
              (interruptionKey) =>
                shouldRender(reportData.interruptions[interruptionKey]) && (
                  <View key={interruptionKey} style={styles.listItem}>
                    <Text style={styles.listItemHeader}>
                      <FormattedMessage {...Messages[interruptionKey]} />
                    </Text>
                    <Text style={styles.listItemValue}>{reportData.interruptions[interruptionKey]}</Text>
                  </View>
                ),
            )}
          </View>
          {reportData.type === 'Predefined' && !reportData?.mapError ? (
            <Text style={styles.detailsTxt} break>
              POSITIONS:
            </Text>
          ) : null}
          {reportData.type === 'Predefined' && !reportData?.mapError ? (
            <View style={styles.listContainer}>
              {reportData.disinfectionPositions.remainingPositions.length > 0 ? (
                <View>
                  <View style={styles.listItemSectionHeader}>
                    <Text>REMAINING</Text>
                  </View>
                  {reportData.disinfectionPositions.remainingPositions.map((disinfectionPosition: any) => (
                    <View key={disinfectionPosition.uuid} style={styles.listItem}>
                      <View style={styles.positionIconContainer}>
                        <View style={styles.positionIconImage}>
                          <RemainingPositionIcon />
                        </View>
                        <Text style={styles.positionIconTextPrimary}>{disinfectionPosition.order}</Text>
                      </View>
                      <Text style={styles.listItemValue}>{disinfectionPosition.name}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                ''
              )}
              {reportData.disinfectionPositions.disinfectedPositions.length > 0 ? (
                <View>
                  <View style={styles.listItemSectionHeader}>
                    <Text>DISINFECTED</Text>
                  </View>
                  {reportData.disinfectionPositions.disinfectedPositions.map((disinfectionPosition: any) => (
                    <View key={disinfectionPosition.uuid} style={styles.listItem}>
                      <View style={styles.positionIconContainer}>
                        <View style={styles.positionIconImage}>
                          <DisinfectedPositionIcon />
                        </View>
                        <Text style={styles.positionIconText}>{disinfectionPosition.order}</Text>
                      </View>
                      <Text style={styles.listItemValue}>{disinfectionPosition.name}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                ''
              )}
              {reportData.disinfectionPositions.failedPositions.length > 0 ? (
                <View>
                  <View style={styles.listItemSectionHeader}>
                    <Text>FAILED</Text>
                  </View>
                  {reportData.disinfectionPositions.failedPositions.map((disinfectionPosition: any) => (
                    <View key={disinfectionPosition.uuid} style={styles.listItem}>
                      <View style={styles.positionIconContainer}>
                        <View style={styles.positionIconImage}>
                          <FailedPositionIcon />
                        </View>
                        <Text style={styles.positionIconText}>{disinfectionPosition.order}</Text>
                      </View>
                      <Text style={styles.listItemValue}>{disinfectionPosition.name}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                ''
              )}
            </View>
          ) : null}
          <View fixed style={styles.footerWrapper}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoLine}></View>
              <Image src="./assets/img/blue-ocean-logo.png" style={styles.footerLogo} />
              <View style={styles.logoLine}></View>
            </View>
            <View style={styles.pageNumberWrapper}>
              <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) => `${pageNumber} of ${totalPages}`}
              />
            </View>
          </View>
        </Page>
      </Document>
    </IntlProvider>
  );
};

async function downloadPdf(reportData: any, onPDFReady: any, map?: ImageData | undefined) {
  const pdfInstance = pdf();
  // pdfInstance.updateContainer(getDocument(reportData, map ? getImageUrlFromImageData(map) : undefined));
  const pdfBlob = await pdfInstance.toBlob();

  onPDFReady();

  const fileNameArr = [
    'UVD-Robots-Disinfection',
    moment().format('YYMMDD'),
    moment().format('HHmmss'),
    reportData.room === '' ? null : reportData.room,
    reportData.department === '' ? null : reportData.department,
    getMongoRobotName(reportData.robotId),
  ];
  /*
  saveAs(
    URL.createObjectURL(pdfBlob),
    fileNameArr.filter((item) => !!item).join("_")
  );*/
}

export { downloadPdf, getDocument };
