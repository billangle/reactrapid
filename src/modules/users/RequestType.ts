export interface IReportRequestDetail  {
    sol: string;
    reportName: string;
    reportYear: string;

}

export interface IReportRequest  {
    email: string;
    reportType: string;
    report: IReportRequestDetail;
}

export interface IReportRequestResponse {
    ReportType: string;
    Email: string;
    Result: string;
}