import './App.css';
import blackPawn from './chess-pawn.svg';
import whitePawn from './white-pawn.svg';
import blackRook from './black-rook.svg';
import blackKnight from './black-knight.svg';
import blackBishop from './black-bishop.svg';
import blackQueen from './black-queen.svg';
import blackKing from './black-king.svg';
import whiteRook from './white-rook.svg';
import whiteKnight from './white-knight.svg';
import whiteBishop from './white-bishop.svg';
import whiteQueen from './white-queen.svg';
import whiteKing from './white-king.svg';
import { useState } from 'react';


const initialState = [
    [
        {
            icon: blackRook,
            color:"black",
            type:"rook"
        },
        {
            icon: blackKnight,
            color:"black",
            type:"knight"
        },
        {
            icon: blackBishop,
            color:"black",
            type:"bishop"
        },
        {
            icon: blackQueen,
            color:"black",
            type:"queen"
        },
        {
            icon: blackKing,
            color:"black",
            type:"king"
        },
        {
            icon: blackBishop,
            color:"black",
            type:"bishop"
        },
        {
            icon: blackKnight,
            color:"black",
            type:"knight"
        },
        {
            icon: blackRook,
            color:"black",
            type:"rook"
        }
    ],
    [...Array(8)].map(() => ({
             icon: blackPawn,
             color:"black",
             type:"pawn"
         }))
    ,

    ...[...Array(4)].map(() => [...Array(8)].map(() => ({
            icon: null
    })))
    ,
    [...Array(8)].map(() => ({
        icon: whitePawn,
        color:"white",
        type:"pawn"
    }))
    ,
    [
        {
            icon: whiteRook,
            color:"white",
            type:"rook"
        },
        {
            icon: whiteKnight,
            color:"white",
            type:"knight"
        },
        {
            icon: whiteBishop,
            color:"white",
            type:"bishop"
        },
        {
            icon: whiteQueen,
            color:"white",
            type:"queen"
        },
        {
            icon: whiteKing,
            color:"white",
            type:"king"
        },
        {
            icon: whiteBishop,
            color:"white",
            type:"bishop"
        },
        {
            icon: whiteKnight,
            color:"white",
            type:"knight"
        },
        {
            icon: whiteRook,
            color:"white",
            type:"rook"
        }
    ],
]
const App = () => {
    const [chessState,setChessState] = useState(initialState);
    const [activeColumn,setActiveColumn] = useState([null, null]);
    const [lastMoved,setLastMoved] = useState("black");

    console.log(activeColumn);

    const changePosition = (initialX, initialY, finalX, finalY) => {

        // chessState[finalX][finalY].icon = chessState[initialX][initialY].icon;
        // chessState[initialX][initialY].icon = null;

        const newState = [...chessState];
        let newPositionColumn = [...newState[finalX]];
        newPositionColumn[finalY] = {
            icon: newState[initialX][initialY].icon,
            color:newState[initialX][initialY].color,
            type:newState[initialX][initialY].type
        
        };
        newState[finalX] = newPositionColumn;

        let newPositionColumn2 = [...newState[initialX]];
        newPositionColumn2[initialY] = {icon:null, color:null};
        newState[initialX] = newPositionColumn2;
        setChessState(newState);
        setLastMoved(lastMoved==="black"? "white":"black");
        setActiveColumn([null,null]);

    }

    const isLegalMove=(initialX,initialY,finalX,finalY) =>
  {
    if(initialX === null)return false;
    const currentPiece = chessState[initialX][initialY];
    const newPosition = chessState[finalX][finalY];
    if(currentPiece.color === lastMoved)return false;

    if(currentPiece.type === "pawn"){
      if(currentPiece.color === "white"){
        if(finalY !== initialY){
          if(newPosition.color === "black" && finalX - initialX === 1 && Math.abs (initialY - finalY) === 1)
          return true;
          return false;
        }
        if(((initialX === 6 && initialX - finalX === 2 && chessState[initialX - 1][initialY].icon === null) ||
          (initialX-finalX === 1)) && chessState[finalX][finalY].icon === null)
          return true;
          return false;
      }
      if(currentPiece.color === "black"){
        if(finalY !== initialY){
          if(newPosition.color === "white" && initialX - finalX === 1 && Math.abs (initialY - finalY) === 1)
          return true;
          return false;
        }
        if(((initialX === 1 && finalX - initialX === 2 && chessState[initialX + 1][initialY].icon === null) ||
          (finalX - initialX === 1)) && chessState[finalX][finalY].icon === null)
          return true;
          return false
    }
  }
  if(currentPiece.type === "rook"){
    if(initialX === finalX){
      let i = initialX<finalX?initialX+1:finalX+1;
      let last = initialX<finalX?finalX:initialX;
      for(;i<last;i++){
        if(chessState[i][initialY].icon !== null) 
        return false;
      }
      if(newPosition.color !== currentPiece.color)
      return true;
    };
    if(initialY===finalY){
      let i =initialY<finalY? initialY+1:finalY+1;
      let last = initialY<finalY? finalY:initialY;
      for(;i<last;i++){
        if(chessState[initialX][i].icon !== null) 
        return false;
    }
    if(newPosition.color !== currentPiece.color)
      return true;
  };
  return false;
}
return true;
}


    return(
        <div className="Chess App">
             <div className="chess-board-container">
                <div className="chess-board">
                    {chessState.map((row, i) => row.map(({icon}, j) => <div
                    className='chess-square'
                    key={`${i}${j}`}
                    style={
                        {
                            backgroundColor: (i+j)%2? "#427711":"#FBFBB6", 
                            color: (i+j)%2? "white" :"black",
                            backgroundImage: `url(${icon})`,
                            display: "grid",
                            placeItems:"center",
                            border: activeColumn[0] === i && activeColumn[1] === j && "5px solid yellow",
                        }
                    }

                    onClick = {()=> {

                        if(activeColumn[0] === i && activeColumn[1] === j) 
                        return
                        if(isLegalMove(activeColumn[0],activeColumn[1], i, j))
                        {
                            changePosition(activeColumn[0], activeColumn[1],i,j);

                        }
                        else if(chessState[i][j].icon !== null){

                            setActiveColumn([i,j]);
                        }
                    }}

                    > </div>))}
                </div>
            </div>
        </div>
    );
}
export default App;