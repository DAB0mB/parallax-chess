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

export function VerticalAxis3D(props: AxisProps) {
  const [position, rotation]: [Vector3Tuple, Vector3Tuple] = props.flip
    ? [[-5, .01, UNIT_SIZE / 2], [0, 0, 0]]
    : [[4, .01, -UNIT_SIZE / 2], [0, Math.PI, 0]];

  return (
    <group position={position}>
      <Unit position={[0, 0, -4]} rotation={rotation}>8</Unit>
      <Unit position={[0, 0, -3]} rotation={rotation}>7</Unit>
      <Unit position={[0, 0, -2]} rotation={rotation}>6</Unit>
      <Unit position={[0, 0, -1]} rotation={rotation}>5</Unit>
      <Unit position={[0, 0, 0]} rotation={rotation}>4</Unit>
      <Unit position={[0, 0, 1]} rotation={rotation}>3</Unit>
      <Unit position={[0, 0, 2]} rotation={rotation}>2</Unit>
      <Unit position={[0, 0, 3]} rotation={rotation}>1</Unit>
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

export function HorizontalAxis3D(props: AxisProps) {
  const [position, rotation]: [Vector3Tuple, Vector3Tuple] = props.flip
    ? [[0, .01, 4 + UNIT_SIZE / 2], [0, 0, 0]]
    : [[0, .01, -5 - UNIT_SIZE / 2], [0, Math.PI, 0]];

  return (
    <group position={position}>
      <Unit position={[-4, 0, 0]} rotation={rotation}>A</Unit>
      <Unit position={[-3, 0, 0]} rotation={rotation}>B</Unit>
      <Unit position={[-2, 0, 0]} rotation={rotation}>C</Unit>
      <Unit position={[-1, 0, 0]} rotation={rotation}>D</Unit>
      <Unit position={[0, 0, 0]} rotation={rotation}>E</Unit>
      <Unit position={[1, 0, 0]} rotation={rotation}>F</Unit>
      <Unit position={[2, 0, 0]} rotation={rotation}>G</Unit>
      <Unit position={[3, 0, 0]} rotation={rotation}>H</Unit>
    </group>
  )
}

const UNIT_SIZE = 1 / 3;

function Unit(props: { children: string, position: Vector3Tuple, rotation: Vector3Tuple }) {
  const theme = useTheme();
  const meshRef = useRef<Mesh | null>(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.position.set(...props.position);
    mesh.rotation.set(...props.rotation);

    const size = new Vector3();
    mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox?.getSize(size);

    mesh.rotateX(-Math.PI / 2);
    mesh.translateX(-size.x / 2);
  });

  return (
    <mesh ref={meshRef}>
      <TextGeometry size={UNIT_SIZE} height={0}>{props.children}</TextGeometry>
      <meshStandardMaterial color={theme.axis} />
    </mesh>
  );
}
