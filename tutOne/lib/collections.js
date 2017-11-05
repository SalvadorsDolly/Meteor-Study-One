import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
	'notes.insert'(text) {
		check(text, String);

		//check if user is logged in
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		//insert notes into collection
		Notes.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username

		});
	},
	'notes.remove'(note) {
		check(note._id, String);
		
		// Below if state insures only note owner can remove
		if( note.owner !== Meteor.userId() ) {
			throw new Meteor.Error('not-authorized');
		};

		Notes.remove(note._id);
	}
});