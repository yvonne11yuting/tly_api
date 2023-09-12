interface RecordData {
    question: string;
    answer: string;
}

interface ResultResponse {
    code: number;
    data: RecordData[] | null;
    message: string;
}