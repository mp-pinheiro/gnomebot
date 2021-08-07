export default class SubCommand {
  constructor(paramType, parsingFunc = null, defaultParam = null) {
    this.paramType = paramType;
    this.defaultParam = defaultParam;
    this.parsingFunc = parsingFunc;
  }

  parseParams(params) {
    // use default param if no type was given in constructor
    // this is useful for subcommands without parameters as well
    if (this.paramType === null) {
      console.log('paramsNull', params);
      return this.defaultParam;
    }

    // try to parse
    if (this.parsingFunc !== null) {
      params = this.parsingFunc(params);
    }

    // if type matches, parsing worked
    if (typeof (params) === this.paramType) {
      // NaN is a number in JS because fuck you
      // emotes are ALSO fucking NaN while being STRINGS
      // fuck node
      // so now we only check for nan on actual fucking numbers
      if (typeof (params) === 'number') {
        if (!isNaN(params)) {
          // not NaN, type number: actual int
          return params;
        }
      } else {
        // if it's anything BUT a type number NaN (fuck this language)
        // return it, it's parsed
        // like a fucking emote
        // which is type string
        // but also fucken NaN
        // ??????
        return params;
      }
    } else {
      console.log('paramsBadParse', params, 'isNotNaN', !isNaN(params), 'type', typeof (params), 'shouldBe', this.paramType);
    }

    // if it got to here, it wasn't parsed
    // return the default param
    return this.defaultParam;
  }

  async process(params) {
    // overload this method with specific subcommand behaviour
    params = this.parseParams(params);

    try {
      // ...
    } catch (err) { }
  }
}