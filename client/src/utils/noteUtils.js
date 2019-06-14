import axios from 'axios';

export function addNote(note, props) {

        if(!localStorage.getItem('aks-tk')){

            if(!localStorage.getItem('noteCount')){
                localStorage.setItem('noteCount', '0');
            }
            let noteCount = JSON.parse(localStorage.getItem('noteCount'));
            noteCount = noteCount+1;
            localStorage.setItem('noteCount', JSON.stringify(noteCount));
            note.id = noteCount;
            note.color = 'white';

            let notes = JSON.parse(localStorage.getItem('notes'));
            notes = notes ? notes : [];
            notes = notes.concat(note);
            localStorage.setItem('notes',JSON.stringify(notes));
            props.getNotes();
            props.modalSwitch();
            return;
        }

        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('aks-tk')
            }
        }
        
        axios.post('/api/notes',note,axiosConfig).then((res) => {
            // this.setState({notes: res.data});
            props.getNotes();
            props.modalSwitch();
        }).catch((e) => {
            console.log(e);
            props.modalSwitch();
        });
    }

export function checkFunction() {

    console.log("function called");   
}

    // let checkFunction = () => {
    // }

    // module.exports = {
    //     // addNote,
    //     checkFunction
    // };