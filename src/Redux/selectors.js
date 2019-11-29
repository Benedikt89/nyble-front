export const getNotes = (state) => state.reducer.notes;
export const getSortDirection = (state) => state.reducer.sortDirection;
export const getSortField = (state) => state.reducer.sortField;
export const getFilter = (state) => state.reducer.filter;

export const getFilteredNotes = (notes, sortDirection, sortField, filter) => {
    //filtering
    if(filter) {
        notes = notes.filter(t => t.title.indexOf(filter) > -1);
    }
    //sorting
    notes.sort((a, b)=>{
        let A = a[sortField].toString().toUpperCase();
        let B = b[sortField].toString().toUpperCase();
        if (A > B) return sortDirection === 'asc' ? 1 : -1;
        if (A < B) return sortDirection === 'asc' ? -1 : 1;
        return 0;
    });
    return notes;
};