## Как устроены стили

### Название классов

В основном название классов исходит из укороченных версий autocomplete. Но иногда бывает удобнее их ещё сократить или
немного изменить, для лучшей читабельности.
Например `bd` на `b`, `bdrs` на `brs`. Одна буква, но большая разница в удобстве.

```
.p_0 // padding: 0;

.pb_0 // padding-bottom: 0;

.m_0 // margin: 0;

.b_0 // border: 0;
```

Все `Add/`, будут иметь `!important`, и располагаться так, чтобы перезаписывать общие стили

```
.bar {
  padding: 40px;
}

class="bar p_0 pb_20" // padding: 0; padding-bottom: 20px;
```

В итоге у нас получиться:

```
div.bar.p_0.pb_0 {
  padding-top: 0 !important;
  padding-bottom: 20px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
```

### Модификаторы классов

Модификатор направления:

```
.ov_Y // overflow-y: hidden;

.gap_10X // column-gap: 10px;
```

+ X - горизонтальное.
+ Y - Вертикальное.

---

Модификаторы единиц измерения:

```
.w_100p // width: 100%;

.vh_100 // height: 100vh;

.opacity_40p // opacity: 0.4;

.maxw_container // max-width: $container_maxw;
```

- p - от Англ. percent
- vh - view-height

> `max` префикс к `w_` и постфикс `$container_`, из-за разных правил оформления классов и названий переменных...

---

Модификаторы цветов:

```
.bc_primary_700-h //[:hover] border-color: var(--primary_700)
```

`-h`-- значит, что при наведении на блок с этим классом сработает `:hover` эффект.

### Flex TODO: Дописать с понятными примерами

Модуль используется, для первоначанльной насройки направления блока и базовое положение контента внутри. В модуль flex,
входят наиболее часто используемы наборы свойст, которые легко можно изменить с помощью `Add/flex.scss`.

```
// Основной класс
.flex_column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: $column_gap;
}

// Вспомогательные
.align_start // align-items: flex-start !important;
.align_end // align-items: flex-end !important;
```

`flex_wrap`, в два одинаковых столбика.

```
div.flex_wrap.gap_20


| -- -- |

div.flex_wrap.gap_20
 div.flex_1.minw_45p
 div.flex_1.minw_45p

| -- -- |
| -- -- |
| --    |

```

> Набор начальных свойст определяется собственным опытом, рассматриваются все предложения по оптимизации.

Есть специальные классы, для быстрого выравнивания контента, по центру блока, по верху и т.п.

```
.flex_startX {
  display: flex;
  justify-content: flex-start;
  gap: $image_align;
}

.flex_topY {
  display: flex;
  align-items: flex-start;
  gap: $image_align;
}
```

### Grid TODO: Дописать с понятными примерами

### Object

Этот модуль нужен для быстрого позиционирования картинки/иконки, или её настройки. Например обрезать, или растянуть на
весь блок, выровнять в блоке по правому краю и т.п.

```
.objf_fill // object-fit: fill !important;
.objp_top // object-position: top !important;
```

### Overflow

`hidden` используется наиболее часто, поэтому используется по умолчанию и его указывать не требуется

```
.ov // overflow: hidden;
.ov_Y // overflow-y: hidden;
.ov_scrollY // overflow-y: scroll;
```

### Position

Position свойства не сокращаются, потому что:

1. Свойства нужно видеть "из далека". то есть, они должны быть легко читаемые.
2. Свойства ни с чем не пересекаются, и не создают путаницу.
3. Удобство.

```
.relative // position: relative;
.left // left: 0;
.left-60 // left: -60px;
```

### Цвета

Цвета `gray_0` и `gray_700` всегда статичны, кроме случаев, когда совершенно не нужны.

Цвета располагаются по системе:

Чем светлее тем выше число. `gray_0 = #000000`, `$gray_700 = #FFFFFF`. Между ними находятся необходимые оттенки.

С остальными цветами (`primary`, `secondary`, etc...) такая же схема.

> Если цветов не хватает, то можно смело расширять цветовую сетку за _700 и добавлять промежуточные, например _150 и
> даже _180 (sass сам сгенерирует новые классы, если расширить $colors).
> Но если у вас много цветов, стоит задуматься над тем, правильно ли работает дизайнер ;)


Примеры:

```
.bg_gray_700 // background: var(--gray_700);
.text_gray_700 // color: var(--gray_700);
.bc_primary_700-h //[:hover] border-color: var(--primary_700)
```

### Сноска

\[n] - Обозначает любое число

\[:hover] - Применён :hover к классу.