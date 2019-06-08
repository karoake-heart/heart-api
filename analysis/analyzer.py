# Beat tracking example
from __future__ import print_function
import librosa
import csv
import database.database


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
        with open('outputs/tempo/{}.csv'.format(self.song_name), 'w', newline='') as csvfile:
            fieldnames = ['interval_start', 'interval_end', 'song_url', 'value_type', 'value']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for b in self.beat_bins:
                tempo, form = librosa.beat.beat_track(y=b[0], sr=b[1])
                writer.writerow({'song_url': 'songs/{}.mp3'.format(self.song_name),
                                 'value_type': 'tempo',
                                 'value': tempo,
                                 'interval_start': b[2],
                                 'interval_end': b[2] + self.bin_size})

analyzer = SongAnalyzer("nobody_beats_the_drum")
analyzer.generate_tempo_csv()




