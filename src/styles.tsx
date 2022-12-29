import { StyleSheet, Font } from '@react-pdf/renderer';
// import industryBoldFont from "./fonts/Industry/Industry-Bold.ttf";
// import robotoRegular from "./fonts/Roboto/Roboto-Regular.ttf";
// import robotoMedium from "./fonts/Roboto/Roboto-Medium.ttf";
// import arialUnicode from "./fonts/Arial/Arial Unicode.ttf";

Font.register({
  family: 'Industry',
  src: './fonts/Industry/Industry-Bold.ttf',
});

Font.register({
  family: 'Roboto',
  src: './fonts/Roboto/Roboto-Regular.ttf',
});

Font.register({
  family: 'Roboto-medium',
  src: './fonts/Roboto/Roboto-Medium.ttf',
});

Font.register({
  family: 'Arial-unicode',
  src: './fonts/Arial/Arial Unicode.ttf',
});

// Documentation in https://react-pdf.org/styling
export const styles = StyleSheet.create({
  page: {
    padding: 50,
  },
  mainHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
    alignContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  headerContainer: {
    marginBottom: 15,
  },
  headerInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 9,
  },
  headerInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  boldText: {
    fontFamily: 'Roboto-medium',
  },
  mainHeader: {
    flex: 1,
    fontFamily: 'Industry',
    fontSize: 16,
  },
  headerLogo: {
    width: 73,
    height: 'auto',
    objectFit: 'contain',
  },
  disinfectionStatusLogo: {
    width: 16,
    height: 16,
    marginRight: 6,
  },

  disinfectionStatusWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
    fontSize: 10,
  },
  disinfectionStatus: {
    textTransform: 'uppercase',
    fontFamily: 'Industry',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  robotNameWrapper: {
    flexGrow: 2,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  robotDateWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  reportDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    fontSize: 12,
  },
  reportDetailsColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    height: 300,
    fontSize: 9,
    width: 455,
    position: 'relative',
    left: -20,
  },
  listItem: {
    width: '50%',
    marginVertical: 3,
    paddingVertical: 7,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottom: 0.5,
    borderBottomStyle: 'solid',
    borderBottomColor: '#dddddd',
    alignItems: 'center',
  },
  listItemSectionHeader: {
    width: '50%',
    marginTop: 8,
    // marginVertical: 3,
    // paddingVertical: 7,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    fontSize: 9,
    fontFamily: 'Industry',
  },
  listItemHeader: {
    justifyContent: 'flex-start',
    flexGrow: 3,
    fontFamily: 'Roboto-medium',
  },
  listItemValue: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    fontFamily: 'Arial-unicode',
  },
  detailsTxt: {
    fontSize: 10,
    marginTop: 12,
    fontFamily: 'Industry',
    borderBottom: 'none',
  },
  mapImageContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#808080',
    position: 'relative',
    paddingBottom: 10,
  },
  emptyMapContainer: {
    height: 300,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(204, 204, 204, 1)',
    position: 'relative',
    paddingBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMapTextHeader: {
    fontFamily: 'Industry',
    fontSize: 10,
    color: 'rgba(102, 102, 102, 1)',
    textTransform: 'uppercase',
  },
  emptyMapTextDescription: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: 'rgba(102, 102, 102, 1)',
  },
  mapImage: {
    height: 300,
    width: 'auto',
    objectFit: 'contain',
  },
  mapLegendWrapper: {
    position: 'absolute',
    height: 150,
    width: 80,
    backgroundColor: 'rgba(36, 37, 37, 0.2)',
    bottom: 10,
    left: 10,
    fontSize: 9,
    borderRadius: 3,
    padding: 10,
  },
  mapLegendHeader: {
    color: '#ffffff',
    opacity: 1,
    marginBottom: 1,
  },
  mapLegendText: {
    color: '#ffffff',
    opacity: 1,
  },
  mapLegendColor100: {
    height: 20,
    width: 10,
    backgroundColor: 'rgb(152, 31, 52)',
    opacity: 1,
  },
  mapLegendColor75: {
    height: 20,
    width: 10,
    backgroundColor: 'rgb(204, 30, 26)',
    opacity: 1,
  },
  mapLegendColor50: {
    height: 20,
    width: 10,
    backgroundColor: 'rgb(234, 113, 113)',
    opacity: 1,
  },
  mapLegendColor25: {
    height: 20,
    width: 10,
    backgroundColor: 'rgb(244, 153, 67)',
    opacity: 1,
  },
  mapLegendColor0: {
    height: 20,
    width: 10,
    backgroundColor: 'rgb(240, 228, 0)',
    opacity: 1,
  },
  logoWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 15%',
  },
  logoLine: {
    flexGrow: 1,
    height: 1,
    backgroundColor: '#b2b2b2',
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  pageNumberWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
  pageNumber: {
    fontSize: 8,
    textAlign: 'right',
    color: '#22a2d9',
  },
  footerLogo: {
    width: 30,
    height: 'auto',
    objectFit: 'contain',
    margin: '15px 15px 15px',
  },
  positionIconContainer: {
    position: 'relative',
    width: 10,
    height: 25,
    marginRight: 20,
  },
  positionIconImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  positionIconText: {
    position: 'absolute',
    color: '#fff',
    top: 7,
    left: 6,
    fontSize: 9,
  },
  positionIconTextPrimary: {
    position: 'absolute',
    color: '#22a2d9',
    top: 7,
    left: 6,
    fontSize: 9,
  },
  positionHeader: {
    fontSize: 10,
    marginTop: 12,
    fontFamily: 'Industry',
  },
});
