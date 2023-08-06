import { useTheme } from '@/theme';
import classNames from 'classnames';
import css from './axis.module.css';
import { TextGeometry } from './text_gemometry';
import { Mesh, Vector3, Vector3Tuple } from 'three';
import { useLayoutEffect, useRef } from 'react';

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
  );
}

export function VerticalAxis3D() {
  return (
    <group position={[0, 0, UNIT_SIZE / 2]}>
      <Unit position={[-5, 0, -4]}>A</Unit>
      <Unit position={[-5, 0, -3]}>B</Unit>
      <Unit position={[-5, 0, -2]}>C</Unit>
      <Unit position={[-5, 0, -1]}>D</Unit>
      <Unit position={[-5, 0, 0]}>E</Unit>
      <Unit position={[-5, 0, 1]}>F</Unit>
      <Unit position={[-5, 0, 2]}>G</Unit>
      <Unit position={[-5, 0, 3]}>H</Unit>
    </group>
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

export function HorizontalAxis3D() {
  return (
    <group position={[-UNIT_SIZE / 2, 0, 0]}>
      <Unit position={[-4, 0, 4]}>1</Unit>
      <Unit position={[-3, 0, 4]}>2</Unit>
      <Unit position={[-2, 0, 4]}>3</Unit>
      <Unit position={[-1, 0, 4]}>4</Unit>
      <Unit position={[0, 0, 4]}>5</Unit>
      <Unit position={[1, 0, 4]}>6</Unit>
      <Unit position={[2, 0, 4]}>7</Unit>
      <Unit position={[3, 0, 4]}>8</Unit>
    </group>
  )
}

const UNIT_SIZE = 1 / 3;

function Unit(props: { children: string, position: Vector3Tuple }) {
  const theme = useTheme();
  const meshRef = useRef<Mesh | null>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.position.set(0, 0, 0);
    mesh.rotation.set(-Math.PI / 2, 0, 0);
    mesh.position.set(...props.position);
  });

  return (
    <mesh ref={meshRef}>
      <TextGeometry size={UNIT_SIZE} height={.01}>{props.children}</TextGeometry>
      <meshStandardMaterial color={theme.axis} />
    </mesh>
  );
}
