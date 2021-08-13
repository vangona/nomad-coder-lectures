export const people  = [
    {
        id : "0",
        name : "Gona",
        age: 25,
        gender: "male"
    },
    {
        id : "1",
        name : "DDAT",
        age: 21,
        gender: "female"
    }
];

export const getById = id => {
    const filteredPeople = people.filter(person => person.id === String(id))
    return filteredPeople[0]
}