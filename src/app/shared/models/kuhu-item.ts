export class _kuhuItem {
    constructor(
        public data: {
            item: {
                _id: string,
                code: string,
                mcq_template_id: string,
                pin: number,
                duration_in_seconds: number,
                duration_in_seconds_per_item: number,
                subject_id: string,
                subject: string,
                topic_id: string,
                topic: string,
                total_questions: number,
                difficulty_level: string,
                isSelected: boolean,
                questions: [{
                    question: string,
                    solution_explanation: string,
                    answers: [
                        {
                            choice_number: string,
                            choice: string,
                            isCorrect: boolean
                        }
                    ]
                }]
            }
        }

    ) { }
}


// class _kuhuItemObj {
//     static create(event: _kuhuItem) {
//         return new _kuhuItem(
//             event.data
//         );
//     }
// }

export interface KuhuItem {
    data: {
        item: {
            _id: string,
            code: string,
            mcq_template_id: string,
            pin: number,
            duration_in_seconds: number,
            duration_in_seconds_per_item: number,
            subject_id: string,
            subject: string,
            topic_id: string,
            topic: string,
            total_questions: number,
            difficulty_level: string,
            isSelected: boolean,
            questions: [{
                question: string,
                solution_explanation: string,
                answers: [
                    {
                        choice_number: string,
                        choice: string,
                        isCorrect: boolean
                    }
                ]
            }]
        }
    }
}