class KuhuItemState {
    constructor(
        public question_number: number,
        public isChosen: boolean,
        public isCorrect: boolean,
        public chosenOption:number,
        public isTimeElapsed: boolean,
        public responseTimeInSeconds: number,
        public remainingTimeInSeconds: number,
        public option1_state: string,
        public option2_state: string,
        public option3_state: string,
        public option4_state: string) { }
}

export class KuhuItemStateObj {
    static create(event: KuhuItemState) {
        return new KuhuItemState(
            event.question_number,
            event.isChosen,
            event.isCorrect,
            event.chosenOption,
            event.isTimeElapsed,
            event.responseTimeInSeconds,
            event.remainingTimeInSeconds,
            event.option1_state,
            event.option2_state,
            event.option3_state,
            event.option4_state
        )
    }
}




