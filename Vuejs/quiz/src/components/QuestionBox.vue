<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template slot="lead">{{currentQuestion.question}}</template>

      <hr class="my-4">
      <b-list-group>
        <b-list-group-item
          v-for="(answer, index) in answers"
          v-bind:key="index"
          @click.prevent="selectedAnswer(index)"
          v-bind:class="answerClass(index)"
        >{{answer}}</b-list-group-item>
      </b-list-group>

      <b-button
        variant="primary"
        @click="submitAnswer"
        v-bind:disabled="selectedIndex === null || answered"
      >Submit</b-button>
      <b-button @click="next" variant="success">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  name: "QuestionBox",

  props: ["currentQuestion", "next", "increment"],

  data: function() {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false
    };
  },

  computed: {
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    }
  },

  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.answered = false;
        this.shuffleAnswers();
      }
    }
  },

  methods: {
    selectedAnswer(index) {
      this.selectedIndex = index;
    },

    submitAnswer() {
      let isCorrect = false;

      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }

      this.answered = true;

      this.increment(isCorrect);
    },

    shuffleAnswers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];
      this.shuffledAnswers = lodash.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },

    answerClass(index) {
      let answerClass = "";

      if (!this.answered && this.selectedIndex === index) {
        answerClass = "selected";
      } else if (this.answered && this.correctIndex === index) {
        answerClass = "correct";
      } else if (
        this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        answerClass = "incorrect";
      }

      return answerClass;
    }
  }
};
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}

.list-group-item:hover {
  background: #eee;
  cursor: pointer;
}

.btn {
  margin: 0 5px;
}

.selected {
  background-color: lightblue;
}

.correct {
  background-color: lightgreen;
}

.incorrect {
  background-color: red;
}
</style>
