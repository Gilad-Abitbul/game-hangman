import type { JSX } from "react"

const HEAD = (
  <div style={{
    width: '50px',
    height: '50px',
    borderRadius: '100px',
    border: '10px solid black',
    position: 'absolute',
    top: '50px',
    right: '-30px', //  -::right ((50px::width / 2) + 5px::border/2)
  }} />
)

const BODY = (
  <div style={{
    width: '10px',
    height: '100px',
    background: 'black',
    position: 'absolute',
    top: '120px',
    right: 0,
  }} />
)

const RIGHT_ARM = (
  <div style={{
    width: '100px',
    height: '10px',
    background: 'black',
    position: 'absolute',
    top: '150px',
    right: '-100px',
    rotate: '-30deg',
    transformOrigin: 'left bottom',
  }} />
)

const LEFT_ARM = (
  <div style={{
    width: '100px',
    height: '10px',
    background: 'black',
    position: 'absolute',
    top: '150px',
    right: '10px',
    rotate: '30deg',
    transformOrigin: 'right bottom',
  }} />
)

const RIGHT_LEG = (
  <div style={{
    width: '100px',
    height: '10px',
    background: 'black',
    position: 'absolute',
    top: '210px',
    right: '-90px',
    rotate: '60deg',
    transformOrigin: 'left bottom',
  }} />
)

const LEFT_LEG = (
  <div style={{
    width: '100px',
    height: '10px',
    background: 'black',
    position: 'absolute',
    top: '210px',
    right: '0px',
    rotate: '-60deg',
    transformOrigin: 'right bottom',
  }} />
)

type HangmanDrawingProps = {
  numberOfguesses: number;
}

const PARTS: JSX.Element[] = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

export function HangmanDrawing({ numberOfguesses }: HangmanDrawingProps) {
  return <div style={{
    position: 'relative',
  }}>
    {PARTS.slice(0, numberOfguesses)}
    <div style={{
      height: '50px',
      width: '10px',
      background: 'black',
      position: 'absolute',
      top: 0,
      right: 0,
    }} />
    <div style={{
      height: '10px',
      width: '200px',
      background: 'black',
      marginLeft: '120px',
    }} />
    <div style={{
      height: '400px',
      width: '10px',
      background: 'black',
      marginLeft: '120px', // (250px - 10px) / 2 = 120px
    }} />
    <div style={{
      height: '10px',
      width: '250px',
      background: 'black',
    }} />
  </div>
}