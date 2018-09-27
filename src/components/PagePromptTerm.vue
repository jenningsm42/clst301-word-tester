<template>
<div>
    <div class='small-container'>
        <h1>{{ term }}</h1>
    </div>
    <div v-if='flipped' class='small-container'>
        <div class='divider' />
        <h3>({{ type }})</h3>
        <h2 v-for='meaning in meanings'>{{ meaning }}</h2>
    </div>
    <div class='prompt-button'>
        <button v-if='!flipped' @click='onFlip'>Flip</button>
        <button v-else @click='onNext'>Next</button>
    </div>
</div>
</template>

<script>
import createWord from '../wordCreator';

export default {
    data: () => ({
        term: '',
        meanings: [],
        type: '',
        flipped: false,
    }),
    created () {
        this.resetTerm();
    },
    mounted () {
        window.addEventListener('keyup', ((event) => {
            // Space or Enter
            if (event.keyCode === 32 || event.keyCode == 13) {
                if (!this.flipped) {
                    this.onFlip(event);
                } else {
                    this.onNext(event);
                }
            }
        }).bind(this));
    },
    methods: {
        onFlip (event) {
            this.flipped = true;
            event.preventDefault();
        },
        onNext (event) {
            this.flipped = false;
            this.resetTerm();
            event.preventDefault();
        },
        resetTerm () {
            const word = createWord();
            this.term = word.terms[Math.floor(Math.random() * word.terms.length)];
            this.meanings = word.meanings;
            this.type = word.type;
        },
    },
}
</script>
