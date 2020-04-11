class Mediator {
    static setPreviewCallback(blockType){
        this.previewCallback = blockType;
    }
    
    static requestType(){
        return this.previewCallback();
    }
}

export default Mediator;
