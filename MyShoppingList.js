/*
    A simple class representing a shopping list.
    This class will update the visual representation of the user input values as well as hold internal list of valid items
 */
class myShoppingList {
    /*
        listElm - a DOM <ul> element that should hold the list of user defined items
     */
    constructor(listElm) {
        this.list = [];         // an array of objects, each consisting of an id and user input value
        this.listElm = listElm; // html list element that should hold the items
        this.lastIndexUsed = 0; // Running element index, aka a table key in db
    }

    /*
    addItem - add an item to the list, this method is invoked by the user "Add" action
    event - an event representing user input
     */
    addItem(event) {
        event.preventDefault(); // prevent the page from reloading on form submission
        const input = document.getElementById("input");
        if (input.value.length) {
            const item = {id: this.lastIndexUsed, value: input.value};
            // update internal list of values
            this.list.push(item);
            // update the view (DOM)
            this.listElm.append(this.createItemNode(item));
            this.lastIndexUsed++;

            // clear user input
            input.value = "";
        }
    }

    /*
        deleteItem - delete an item from the list, this method is invoked by the user "X" action
        itemId - the id of the item to delete, corresponds to the item id in the list array
     */
    deleteItem(itemId) {
        // update internal list of values
        this.list = this.list.filter(listItem => listItem.id !== itemId);
        // update the view (DOM)
        this.listElm.querySelector("[data-id=\"" + itemId + "\"]").remove();
    }

    /*
        item - an object with two properties:
            id - a numeric id representing the item in the internal list
            value - user input value
        returns a list element with the value and a button to delete it
     */
    createItemNode(item) {
        const li = document.createElement("li");
        li.setAttribute("data-id", item.id);
        const textSpan = document.createElement("span");
        const text = document.createTextNode(item.value);
        textSpan.appendChild(text);
        const deleteButton = document.createElement("button",);
        deleteButton.innerText = "X";
        deleteButton.onclick = () => this.deleteItem(item.id);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);

        return li;
    }
}


