import React from 'react';
import TrackForm from '../components/TrackForm';
import TrackList from '../components/TrackList';

export default function TracksPage() {
  return (
    <div>
      <h2>Tracks</h2>
      <TrackForm />
      <TrackList />
    </div>
  );
}
