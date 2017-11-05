import { Template } from 'meteor/templating';

import { Notes } from '../lib/collections.js';

import { Accounts } from 'meteor/accounts-base';

// config Accounts here
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
	/* created a static array but no longer needed for project
	notes:[
		{text:'My Note 01'},
		{text:'My Note 02'},
		{text:'My Note 03'}
	],
	*/
	notes() {
		return Notes.find({});
	}

});

Template.submit.events({
	'submit .add-form': function() {
		event.preventDefault();

		// get input value from modal
		const target = event.target;
		const text = target.text.value;

		//insert notes into collection
		//this was removed to make secure via Meteor methods in collections.js
		/*Notes.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username

		});*/
		Meteor.call('notes.insert', text);

		// this clears form
		target.text.value = '';

		//close modal
		$('#addModal').modal('close');

		return false;
	}
});

Template.note.events({
	'click .delete-note': function() {
		/*Notes.remove( this._id ); 
		Notes.remove was taken out and moved to collections for security. 
		Was only used on insecure Meteor Prototype*/

		Meteor.call('notes.remove', this);
		return false;
	}
});


