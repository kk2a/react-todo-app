# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。作成時間は20時間．

## こだわりポイント

- 実装にこだわっています．関数コンポーネントは別のファイルで定義し，可読性の向上を図っています．また，型エイリアスを使い型を変更したりしてもコードの修正箇所を減らすようにしています．
- 大きな数を直感的に楽しめる表現を心がけています．大きな数値をそのまま視覚的に表現できる工夫をしています．例えば，優先度は0から1000までの整数で設定可能で，その数値に応じて同じ数だけ星を表示します．最大で1000個の星が画面に並ぶ様子は，とてもインパクトがあり，見る人の気持ちを高揚させます．こうした視覚的楽しさを重視したデザインが特徴です．さらに，同様の体験を提供する機能として，「クリスマスモード」も実装しています．
- クリスマスモード (イベントモード) があります．クリスマスモードは，クリスマスの楽しさを独自の形で表現した機能です．このモードをオンにすると，12月25日のn日前を「クリスマスイブ…イブ」と表記し，「イブ」の数はn個です．例えば，クリスマスの5日前なら「クリスマスイブイブイブイブイブ」と表示されます．この「イブ」という表現はイブニングという意味ですが，ここでは「前日」と解釈し楽しくアレンジしています．ちなみに，このアイデアは山下達郎の「クリスマスイブ」を聞いたときに思いつきました．

## 開発履歴

- 2024年10月24日：プロジェクト開始

## ライセンス

MIT License

Copyright (c) 2024 kk2a

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
