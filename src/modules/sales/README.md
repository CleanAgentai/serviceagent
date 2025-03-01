# Automated Lead Scoring Feature

## Overview

The Automated Lead Scoring feature provides a sophisticated system for evaluating and prioritizing leads based on customizable criteria. This helps sales teams focus their efforts on the most promising prospects, increasing conversion rates and efficiency.

## Key Components

### 1. Lead Score Indicator

- **Visual Representation**: Displays lead scores as color-coded circles (Hot/Warm/Cool/Cold)
- **Interactive Tooltips**: Hover over scores to see detailed breakdown of how the score was calculated
- **Size Variants**: Available in small, medium, and large sizes for different UI contexts
- **AI Indicators**: Special indicators for scores that have been adjusted by AI

### 2. Scoring Settings Panel

- **Rule Management**: Create, edit, delete, and toggle scoring rules
- **Score Range Configuration**: Set minimum and maximum score boundaries
- **AI Assistance Toggle**: Enable/disable AI-assisted scoring adjustments
- **Rule Builder**: Intuitive interface for creating complex scoring rules with:
  - Multiple field options (source, budget, interaction count, etc.)
  - Various operators (equals, contains, greater than, etc.)
  - Customizable point values (positive or negative)

### 3. Scoring Logic

- **Rule-Based Evaluation**: Each lead is evaluated against all active rules
- **Score Calculation**: Points from matching rules are summed to create the total score
- **AI Enhancements**: Optional AI adjustments based on lead behavior patterns
- **Score Breakdown**: Detailed tracking of which rules contributed to a lead's score

## Scoring Criteria

The system evaluates leads based on various factors including:

- **Lead Source**: Higher scores for leads from high-value channels (e.g., LinkedIn)
- **Budget**: Points awarded for having a budget specified and for higher budget amounts
- **Company Information**: Points for leads with complete company details
- **Interaction History**: Higher scores for leads with multiple interactions
- **Engagement Patterns**: AI-detected patterns in lead behavior
- **Custom Criteria**: Admins can create custom rules based on any lead attribute

## Implementation Details

### Data Structure

- **Lead Type**: Extended with `scoreBreakdown`, `budget`, `interactionCount`, etc.
- **ScoreRule Interface**: Defines the structure of scoring rules
- **ScoreBreakdown Interface**: Tracks which rules contributed to a score

### Services

- **calculateLeadScore**: Evaluates a lead against all active rules
- **evaluateRule**: Applies a single rule to a lead
- **applyAIScoreAdjustments**: Enhances scores with AI-detected patterns
- **getDefaultScoringSettings**: Provides initial scoring configuration

## User Experience

1. **For Sales Reps**:
   - See lead scores at a glance in the lead table
   - Hover over scores to understand how they were calculated
   - Focus on "Hot" and "Warm" leads for better conversion rates

2. **For Admins**:
   - Access the Scoring Settings panel via the "Scoring Settings" button
   - Create and manage scoring rules
   - Configure AI assistance for enhanced scoring
   - Adjust score ranges to fit business needs

## Technical Implementation

The feature is implemented using:

- **React Components**: For UI elements and interactive features
- **TypeScript Interfaces**: For type safety and code clarity
- **Tailwind CSS**: For styling and responsive design
- **Lucide Icons**: For visual elements
- **UUID**: For generating unique identifiers for rules

## Future Enhancements

- **Machine Learning Integration**: Replace simulated AI with actual ML models
- **Historical Score Tracking**: Track how scores change over time
- **A/B Testing**: Compare different scoring models for effectiveness
- **Industry Benchmarks**: Compare lead quality against industry standards
- **Predictive Scoring**: Forecast which leads are likely to convert 