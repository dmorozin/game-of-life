import React, { Component } from "react";
import "./Grid.css";

class Grid extends Component {
  state = {
    arr: [],
    rows: 30,
    cols: 60,
    counter: 0,
    stop: true
  };

  componentDidMount = () => {
    this.setState({ arr: this.generateArr(), stop: false }, () => {
      this.startGame();
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    let state = this.state;
    return state.arr !== nextState.arr;
  }

  startGame = () => {
    // console.log(this.state.stop);
    if (!this.state.stop) {
      this.interval = setInterval(() => {
        this.changeArr();
        this.setState({ counter: this.state.counter + 1 });
      }, 100);
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateArr = () => {
    const arr = [];

    for (let i = 0; i < this.state.rows; i++) {
      arr.push([]);
      for (let j = 0; j < this.state.cols; j++) {
        arr[i].push(Math.floor(Math.random() * 2));
        //arr[i].push(0);
      }
    }
    /*arr[10][20] = 1;
    arr[11][20] = 1;
    arr[12][20] = 1;
    arr[13][20] = 1;
    arr[14][20] = 1;
    arr[10][24] = 1;
    arr[11][24] = 1;
    arr[12][24] = 1;
    arr[13][24] = 1;
    arr[14][24] = 1;
    arr[10][22] = 1;
    arr[14][22] = 1;*/

    return arr;
  };

  changeArr = () => {
    const arr = [...this.state.arr];
    const newArr = [];
    // console.log(arr);
    let cnt = 0;
    for (let i = 0; i < arr.length; i++) {
      newArr.push([]);
      for (let j = 0; j < arr[i].length; j++) {
        cnt = this.findingNeighbors(arr, i, j);
        if (arr[i][j] === 0) {
          if (cnt === 3) {
            newArr[i].push(1);
          } else newArr[i].push(arr[i][j]);
        } else {
          if (cnt < 2 || cnt > 3) newArr[i].push(0);
          else newArr[i].push(arr[i][j]);
        }
      }
    }
    //console.log("new arr", newArr);
    this.setState({ arr: newArr });
  };

  findingNeighbors = (myArray, i, j) => {
    const rowLimit = myArray.length - 1;
    const columnLimit = myArray[0].length - 1;

    let cnt = 0;

    for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
        if (x !== i || y !== j) {
          if (myArray[x][y] === 1) cnt++;
        }
      }
    }
    return cnt;
  };

  handleStop = () => {
    clearInterval(this.interval);
    this.setState({ stop: !this.state.stop }, () => this.startGame());
  };

  clearBoard = () => {
    clearInterval(this.interval);
    const arr = [...this.state.arr].map((arrI, i) => {
      return arrI.map((arrJ, j) => {
        arrJ = 0;
        return arrJ;
      });
    });
    this.setState({ arr: arr, counter: 0, stop: true }, () => {
      this.startGame();
    });
  };

  randomize = () => {
    clearInterval(this.interval);
    this.setState({ arr: this.generateArr(), counter: 0 }, () => {
      console.log(this.state.arr);
    });
    this.interval = setInterval(() => {
      this.changeArr();
      this.setState({ counter: this.state.counter + 1 });
    }, 100);
  };

  toggle = (i, j) => {
    const arr = [...this.state.arr];
    if (arr[i][j] === 0) {
      arr[i][j] = 1;
    }
    this.setState({ arr });
  };

  render() {
    return (
      <div className="container">
        <h1>Game of life</h1>
        <div className="grid-container">
          {this.state.arr.map((arrI, i) => {
            return arrI.map((arrJ, j) => {
              return (
                <div
                  className={"back" + arrJ + " grid-item"}
                  key={j + i * this.state.cols}
                  id={j + i * this.state.cols}
                  onClick={() => this.toggle(i, j)}
                />
              );
            });
          })}
        </div>
        <div className="btns">
          <p className="generations">{this.state.counter}</p>
          <button onClick={this.handleStop}>Start/Stop</button>
          <button onClick={this.clearBoard}>Clear board</button>
          <button onClick={this.randomize}>Randomize</button>
        </div>
      </div>
    );
  }
}

export default Grid;
