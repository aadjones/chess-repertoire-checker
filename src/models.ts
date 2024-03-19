import { Chess } from "chess.js";

export interface Player {
  user: {
    id: string;
    name: string;
  };
  rating: number;
  // Add more player-specific fields here
}

export class Game {
  id: string = "";
  rated: boolean = false;
  variant: string = "standard";
  speed: string = "classical";
  perf: string = "classical";
  createdAt: number = Date.now();
  lastMoveAt: number = Date.now();
  status: string = "created";
  players: {
    white: {
      user: {
        name: string;
        title?: string;
        patron?: boolean;
        id: string;
      };
      rating: number;
      ratingDiff: number;
    };
    black: {
      user: {
        name: string;
        id: string;
      };
      rating: number;
      ratingDiff: number;
    };
  } = {
    white: {
      user: { name: "", id: "", title: undefined, patron: undefined },
      rating: 1200,
      ratingDiff: 0,
    },
    black: { user: { name: "", id: "" }, rating: 1200, ratingDiff: 0 },
  };
  opening?: {
    eco: string;
    name: string;
    ply: number;
  } = { eco: "", name: "", ply: 0 };
  moves: string = "";
  clock?: {
    initial: number;
    increment: number;
    totalTime: number;
  } = { initial: 0, increment: 0, totalTime: 0 };
  private _chessInstance?: Chess;

  constructor(init?: Partial<Game>) {
    if (init) {
      Object.assign(this, init);
    }
  }

  generatePgn(): string {
    const tags = [
      `[Event "${this.variant}"]`,
      `[Site "https://lichess.org/${this.id}"]`,
      `[Date "${new Date(this.createdAt).toISOString().split("T")[0]}"]`,
      `[White "${this.players.white.user.name}"]`,
      `[Black "${this.players.black.user.name}"]`,
      `[Result "${this.resultToPgn()}"]`, // Ensure this method is called here
    ];

    // Conditionally add ECO and Opening tags if the information is available
    if (this.opening?.eco && this.opening?.name) {
      tags.push(`[ECO "${this.opening.eco}"]`);
      tags.push(`[Opening "${this.opening.name}"]`);
    }

    const pgn = `${tags.join("\n")}\n\n${this.moves} ${this.resultToPgn()}`;
    return pgn;
  }

  // Helper method to convert game status to PGN result format
  private resultToPgn(): string {
    switch (this.status) {
      case "win":
        return "1-0";
      case "loss":
        return "0-1";
      case "draw":
        return "1/2-1/2";
      default:
        return "*";
    }
  }
  // Getter for the chess instance that initializes it from the PGN if it hasn't been already
  get chessInstance(): Chess {
    if (!this._chessInstance) {
      this._chessInstance = new Chess();

      try {
        // Attempt to load the PGN into the chess instance
        const pgn = this.generatePgn();
        this._chessInstance.loadPgn(pgn);
      } catch (error) {
        console.error("Failed to load PGN into Chess instance:", error);
        // Handle the error as appropriate
        // For example, you might reset the _chessInstance to a new, empty Chess instance
        this._chessInstance = new Chess();
      }
    }
    return this._chessInstance;
  }
  loadFromPgn(pgn: string): Game {
    const chess = new Chess();

    try {
      // Use the return value to check for success
      chess.loadPgn(pgn);
      this._chessInstance = chess; // Store the loaded Chess instance
      // Update the moves property using Standard Algebraic Notation (SAN)
      this.moves = chess.history().join(" ");
    } catch (error) {
      console.error("Failed to load PGN:", error);
      // Handle the error as needed
      // The handling might involve throwing the error further or setting up some default state
      throw error; // or handle differently
    }

    // After successfully loading the PGN, set up your Game instance properties
    // based on the loaded game or the needs of your application

    return this; // Allows chaining
  }
}

export interface StudyChapter {
  event: string;
  site: string;
  result: string;
  variant: string;
  eco: string;
  opening: string;
  annotator?: string;
  utcDate: string;
  utcTime: string;
  moves: string; // This could be a string of PGN moves or further parsed into more structured data
}

export interface Study {
  id: string;
  chapters: StudyChapter[];
}
