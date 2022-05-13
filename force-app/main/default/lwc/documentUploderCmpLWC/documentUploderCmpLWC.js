import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
/*import {loadStyle} from 'lightning/platformResourceLoader';//when you used you have to upload css file on static Resources
import customSR from '@salesforce/resourceUrl/customcssForINput_Upload';*/
export default class DocumentUploderCmpLWC extends LightningElement {
    @api recordId;
    get acceptedFormats(){

        return ['.pdf', '.png','.jpg','.jpeg'];
    } 
    renderedCallback(){
        //This was used for applying css on standard element
        //1 Method . we can use Promise and load Style to load css
        //2.Method . bind a style tag directly on this element
         
        /*Promise.all([
            loadStyle(this,customSR)
        ]);*/ //to load a custom style
        const style = document.createElement('style');
        style.innerText = ` lightning-primitive-file-droppable-zone.slds-file-selector__dropzone{
            border:none !important;
        }
        
        span.slds-file-selector__text.slds-medium-show {
            display: none;
        }
        `;
        this.template.querySelector('lightning-file-upload').appendChild(style);

    }
    handleUploadFinished(event){
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );

    }
}