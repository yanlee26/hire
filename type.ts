interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}

type FuncNamePick<T>  = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type EffectModuleFuncNames = FuncNamePick<EffectModule>;

type resolveEffectModuleFunc<T> = T extends (input : Promise<infer U>) => Promise<Action<infer V>>
    ? (input: U) => Action<V>
    : T extends (action: Action<infer U>) => Action<infer V>
        ? (action: U) => Action<V>
            : never;

type Connect = (module: EffectModule) => {
    [T in EffectModuleFuncNames]: resolveEffectModuleFunc<EffectModule[T]>
}


type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
}