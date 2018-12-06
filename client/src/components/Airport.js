import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const suggestions = [
  { label: "ATL", city: "Atlanta" },
  { label: "LAX" },
  { label: "ORD" },
  { label: "DFW" },
  { label: "DEN" },
  { label: "JFK" },
  { label: "SFO" },
  { label: "LAS" },
  { label: "SEA" },
  { label: "CLT" },
  { label: "EWR" },
  { label: "MCO" },
  { label: "PHX" },
  { label: "MIA" },
  { label: "IAH" },
  { label: "BOS" },
  { label: "MSP" },
  { label: "DTW" },
  { label: "FLL" },
  { label: "PHL" },
  { label: "LGA" },
  { label: "BWI" },
  { label: "SLC" },
  { label: "DCA" },
  { label: "IAD" },
  { label: "SAN" },
  { label: "MDW" },
  { label: "TPA" },
  { label: "HNL" },
  { label: "PDX" }
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, suggestion.city, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 50,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class Airport extends React.Component {
  state = {
    suggestions: [],
    airport: ""
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (e, {newValue}) => {
    console.log(e.target);
    this.props.onChange(e, { name: "airport", value: newValue })
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <div className={classes.root}>
        <MenuItem><span className="menuLabel">Airport: &nbsp;</span>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
          
            name: "airport",
            type: "text",
            classes,
            placeholder: "Search an Airport Code",
            value: this.props.currAirport,
            onChange: this.onChange
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
        </MenuItem>
      </div>
    );
  }
}

Airport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Airport);
