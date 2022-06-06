import React from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export default class Feedback extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = option => {
    this.setState(prevState => ({ [option]: prevState[option] + 1 }));
  };

  feedbackCounts = () => Object.values(this.state).reduce((a, b) => a + b);
  positiveCounts = () => Math.round((this.state.good / this.feedbackCounts()) * 100);

  render() {
    let total = this.feedbackCounts()
    const { good, neutral, bad } = this.state;

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={this.positiveCounts()}
            />
          ) : (
          <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }
}
