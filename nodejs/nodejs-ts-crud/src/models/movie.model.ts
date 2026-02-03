import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  writers: string[];
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
    };
    production: string;
    lastUpdated: Date;
  };
}

const MovieSchema: Schema = new Schema({
  plot: { type: String, required: true },
  genres: [{ type: String }],
  runtime: { type: Number },
  cast: [{ type: String }],
  num_mflix_comments: { type: Number },
  poster: { type: String },
  title: { type: String, required: true },
  fullplot: { type: String },
  languages: [{ type: String }],
  released: { type: Date },
  directors: [{ type: String }],
  writers: [{ type: String }],
  awards: {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String }
  },
  lastupdated: { type: String },
  year: { type: Number },
  imdb: {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number }
  },
  countries: [{ type: String }],
  type: { type: String },
  tomatoes: {
    viewer: {
      rating: { type: Number },
      numReviews: { type: Number }
    },
    production: { type: String },
    lastUpdated: { type: Date }
  }
});

export default mongoose.model<IMovie>('Movies', MovieSchema);
