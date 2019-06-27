import axios from 'axios';

export function handleSave(noteValue, props) {
    const note = {
        //ternary prevents trim from being called on an undefined value
        title: noteValue.title === undefined ? '' : noteValue.title.trim(),
        body: noteValue.body === undefined ? '' : noteValue.body.trim()
    }

    const noteIsSame = (note.title === props.currentNote.title 
                            && note.body === props.currentNote.body);

    const noteIsEmpty = (note.title === '' && note.body === '')
    
    //prevents empty note or a note that hasnt changed from being saved
    if( noteIsEmpty || noteIsSame){
        props.modalSwitch();
        return;
    }
    
    if(Object.keys(props.currentNote).length >= 1){
        console.log('new note being updated')
        updateNote(note, props);
        return;
    }

    addNote(note, props);
}

function addNote(note, props) {
        props.loaderOn();

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
            props.loaderOff();
        }).catch((e) => {
            console.log(e);
            props.modalSwitch();
            props.loaderOff();
        });
    }

export function deleteNote(props) {

    props.loaderOn();

    if(!localStorage.getItem('aks-tk')) {
        let notes = JSON.parse(localStorage.getItem('notes'));
        const id = notes.findIndex(i => i.id === props.currentNote.id);
        notes.splice(id,1);
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
    
    axios.delete(`/api/notes/${props.currentNote._id}`,axiosConfig).then((res) => {
        // this.setState({notes: res.data});
        props.getNotes();
        props.modalSwitch();
        props.loaderOff();
    }).catch((e) => {
        console.log(e);
        props.modalSwitch();
        props.loaderOff();
    });
}

function updateNote(note, props) {

    props.loaderOn();

    if(!localStorage.getItem('aks-tk')) {
        let notes = JSON.parse(localStorage.getItem('notes'));
        const id = notes.findIndex(i => i.id === props.currentNote.id);
        notes[id].title = note.title;
        notes[id].body = note.body;
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
    
    axios.patch(`/api/notes/${props.currentNote._id}`,note,axiosConfig).then((res) => {
        // this.setState({notes: res.data});
        props.getNotes();
        props.modalSwitch();
        props.loaderOff();
    }).catch((e) => {
        console.log(e);
        props.modalSwitch();
        props.loaderOff();
    });
}