import axios from 'axios';

function showSnackbar(msg) {
    let snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = "Note " + msg;
    snackbar.className = "show";
    setTimeout(function(){
        snackbar.className = snackbar.className.replace("show", "");
    },3000);
}

export function handleSave(noteValue, props) {
    const note = {
        //ternary prevents trim from being called on an undefined value
        title: noteValue.title === undefined ? '' : noteValue.title.trim(),
        body: noteValue.body === undefined ? '' : noteValue.body.trim(),
        color: noteValue.color
    }

    const noteIsSame = (note.title === props.currentNote.title 
                            && note.body === props.currentNote.body
                            && note.color === props.currentNote.color);

    const noteIsEmpty = (note.title === '' && note.body === '')
    
    //prevents empty note or a note that hasnt changed from being saved
    if( noteIsEmpty || noteIsSame){
        props.modalSwitch();
        return;
    }
    //TODO:recheck if it could fail with same length 
    if(Object.keys(props.currentNote).length >= 1){
        updateNote(note, props);
        showSnackbar("Saved!");
        return;
    }

    addNote(note, props);
    showSnackbar("Saved!");
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
            note._id = noteCount;

            let notes = JSON.parse(localStorage.getItem('notes'));
            notes = notes ? notes : [];
            notes = notes.concat(note);
            localStorage.setItem('notes',JSON.stringify(notes));
            props.getNotes();
            props.modalSwitch();
            props.loaderOff();
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
        const _id = notes.findIndex(i => i._id === props.currentNote._id);
        notes.splice(_id,1);
        localStorage.setItem('notes',JSON.stringify(notes));
        props.getNotes();
        props.modalSwitch();
        props.loaderOff();
        showSnackbar("Deleted!");
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
        showSnackbar("Deleted!");
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
        const _id = notes.findIndex(i => i._id === props.currentNote._id);
        notes[_id].title = note.title;
        notes[_id].body = note.body;
        notes[_id].color = note.color;
        localStorage.setItem('notes',JSON.stringify(notes));
        props.getNotes();
        props.modalSwitch();
        props.loaderOff();
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

 export function getNoteColor(noteColor){
    let color ='';

    switch(noteColor) {
        case 'red':
            color = '#F5535E';
            break;
        case 'blue':
            color = '#61dafb';
            break;
        case 'yellow':
            color = '#ffde4c';
            break;
        case 'green':
            color = '#90EE90';
            break;
        case 'purple':
            color = '#9f79ee';
            break;
        default: 
            color = 'white';
    }

    return color;
}