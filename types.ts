interface RecordData {
    question: string;
    answer: string;
    note?: string;
}

interface ResultResponse {
    code: number;
    data: RecordData[] | null;
    message: string;
}