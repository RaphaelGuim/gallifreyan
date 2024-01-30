 Consonant.checkCompostConsonant =(letter)=> {
    return ["ch", "ph", "wh", "sh", "th", "gh", "qu", "ng"].includes(letter);
  }
  Consonant.getConsonant = (letter, word)=> {
    let consonant;
    switch (letter) {
      case "b":
        return new Consonant(CONSONANT_B, word,[],letter);
      case "c":
        consonant = new Consonant(CONSONANT_C, word,[],letter);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "ch":
        consonant = new Consonant(CONSONANT_CH, word,[],letter);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "d":
        consonant = new Consonant(CONSONANT_D, word,[],letter);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
      case "f":
        consonant = new Consonant(CONSONANT_F, word,[],letter);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "g":
        consonant = new Consonant(CONSONANT_D, word,[],letter);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "gh":
        consonant = new Consonant(CONSONANT_GH, word,[],letter);
        consonant.modifiers = Modifier.createDots(1, consonant);
        return consonant;
      case "h":
        consonant = new Consonant(CONSONANT_H, word,[],letter);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "j":
        return new Consonant(CONSONANT_J, word,[],letter);
      case "k":
        consonant = new Consonant(CONSONANT_K, word,[],letter);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "l":
        consonant = new Consonant(CONSONANT_L, word,[],letter);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
      case "m":
        consonant = new Consonant(CONSONANT_M, word,[],letter);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "n":
        consonant = new Consonant(CONSONANT_N, word,[],letter);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "ng":
        consonant = new Consonant(CONSONANT_NG, word,[],letter);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "p":
        consonant = new Consonant(CONSONANT_P, word,[],letter);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "ph":
        consonant = new Consonant(CONSONANT_PH, word,[],letter);
        consonant.modifiers = Modifier.createDots(1, consonant);
        return consonant;
      case "q":
        return new Consonant(CONSONANT_Q, word,[],letter);
      case "qu":
        consonant = new Consonant(CONSONANT_QU, word,[],letter);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "r":
        consonant = new Consonant(CONSONANT_R, word,[],letter);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
      case "s":
        consonant = new Consonant(CONSONANT_S, word,[],letter);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "sh":
        consonant = new Consonant(CONSONANT_SH, word,[],letter);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "t":
        return new Consonant(CONSONANT_T, word,[],letter);
      case "th":
        return new Consonant(CONSONANT_TH, word,[],letter);
      case "v":
        consonant = new Consonant(CONSONANT_V, word,[],letter);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "x":
        consonant = new Consonant(CONSONANT_QU, word,[],letter);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "w":
        consonant = new Consonant(CONSONANT_W, word,[],letter);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "wh":
        consonant = new Consonant(CONSONANT_WH, word,[],letter);
        consonant.modifiers = Modifier.createDots(1, consonant);
        return consonant;
      case "y":
        consonant = new Consonant(CONSONANT_Y, word,[],letter);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "z":
        consonant = new Consonant(CONSONANT_Z, word,[],letter);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
    }
  }
  