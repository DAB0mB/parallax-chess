import classNames from 'classnames';
import css from './axis.module.css';

export type AxisProps = {
  flip?: boolean,
};

export function VerticalAxis(props: AxisProps) {
  const flipClass = { [css.flip]: props.flip };

  return (
    <div className={css.vAxis}>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>8</div>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>7</div>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>6</div>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>5</div>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>4</div>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>3</div>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>2</div>
      <div className={classNames(css.unit, css.vUnit, flipClass)}>1</div>
    </div>
  )
}

export function HorizontalAxis(props: AxisProps) {
  const flipClass = { [css.flip]: props.flip };

  return (
    <div className={css.hAxis}>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>A</div>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>B</div>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>C</div>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>D</div>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>E</div>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>F</div>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>G</div>
      <div className={classNames(css.unit, css.hUnit, flipClass)}>H</div>
    </div>
  );
}
