# Beat tracking example
from __future__ import print_function
import librosa
import csv


class SongAnalyzer:
    def __init__(self, song_name, bin_size=2):
        self.song_name = song_name
        self.bin_size = bin_size
        self.waveform, self.sampling_rate = self.load_song()
        self.duration = self.get_song_duration()
        self.onset_frames = librosa.onset.onset_detect(y=self.waveform, sr=self.sampling_rate)
        self.beat_bins = self.generate_beat_bins()

    def generate_beat_bins(self):
        start = 0
        beat_bins = []
        while start < self.duration:
            wf, sr = librosa.load("songs/{}.mp3".format(self.song_name), offset=start, duration=self.bin_size)
            beat_bins.append((wf, sr, start))
            start += self.bin_size
        return beat_bins

    def get_song_duration(self):
        return librosa.get_duration(y=self.waveform, sr=self.sampling_rate)

    def load_song(self):
        wf, sr = librosa.load("songs/{}.mp3".format(self.song_name))
        return wf, sr

    def generate_tempo_csv(self):
        with open('outputs/{}.csv'.format(self.song_name), 'w', newline='') as csvfile:
            fieldnames = ['song_name', 'tempo', 'point_in_song_seconds']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for b in self.beat_bins:
                tempo, form = librosa.beat.beat_track(y=b[0], sr=b[1])
                writer.writerow({'song_name': self.song_name, 'tempo': tempo, 'point_in_song_seconds': b[2]})

analyzer = SongAnalyzer("nobody_beats_the_drum")
analyzer.generate_tempo_csv()



