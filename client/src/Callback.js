import React,{ useRef, useEffect }from 'react';
import Draw from "./Draw";
import { BoardState, blockTypes } from './board-state/board-state';

class Callback{
    static setPreviewCallback(blockType){
        this.previewCallback = blockType;
    }
    static requestType(){
        return this.previewCallback();
    }
}
export default Callback;