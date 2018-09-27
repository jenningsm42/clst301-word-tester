<template>
<div>
    <div class='small-container'>
        <h1>{{ meaning }}</h1>
        <h3>({{ type }})</h3>
    </div>
    <div class='divider' />
    <div class='term-input-container'>
        <input
            ref='termInput'
            class='term-input'
            type='text'
            v-model='userTerm'
            :disabled='checked' />
        <span class='marker' v-if='checked'>
            <span v-if='correct' style='color: green'>✔</span>
            <span v-else style='color: red'>✘</span>
        </span>
    </div>
    <div v-if='checked' class='small-container'>
        <h2 v-for='term in terms'>{{ term }}</h2>
    </div>
    <div class='prompt-button'>
        <button v-if='!checked' @click='onCheck'>Check</button>
        <button v-else @click='onNext'>Next</button>
    </div>
</div>
</template>

<script>
import createWord from '../wordCreator';

export default {
    data: () => ({
        meaning: '',
        type: '',
        terms: [],
        checked: false,
        userTerm: '',
        correct: false,
    }),
    created () {
        this.resetMeaning();
    },
    mounted () {
        window.addEventListener('keyup', ((event) => {
            // Enter
            if (event.keyCode == 13) {
                if (!this.checked) {
                    this.onCheck(event);
                } else {
                    this.onNext(event);
                }
            }
        }).bind(this));

        this.$refs.termInput.focus();
    },
    methods: {
        onCheck (event) {
            this.correct = this.terms.reduce((acc, term) => {
                return acc || this.userTerm === term;
            }, false);
            this.checked = true;
            event.preventDefault();
        },
        onNext (event) {
            this.userTerm = '';
            this.checked = false;
            this.resetMeaning();

            // Need to wait until next tick for input to be enabled again
            const self = this;
            this.$nextTick(() => self.$refs.termInput.focus());

            event.preventDefault();
        },
        resetMeaning () {
            const word = createWord();
            this.meaning = word.meanings[Math.floor(Math.random() * word.meanings.length)];
            this.type = word.type;
            this.terms = word.terms;
        },
    },
}
</script>

<style rel='stylesheet/scss' lang='scss'>
div.term-input-container {
    width: 50%;
    margin: 1em auto;

    input.term-input {
        width: 90%;
    }

    .marker {
        position: fixed;
        margin-top: -0.1em;
        margin-left: .5em;
        font-size: 1.5em;
    }

}
</style>
