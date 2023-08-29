interface iEntryLengthIndicator {
  length: number;
}

export function EntryLengthIndicator(props: iEntryLengthIndicator) {
  const { length } = props;
  const maxLength = 280;

  const charIndicatorProgress = length > 0
    ? `${(length / maxLength) * 100}%`
    : '0%';
  const charIndicatorExcess = length > maxLength
    ? `${((props.length - maxLength) / maxLength) * 100}%`
    : '0%';

  return (
    <div class='isl-inputNote-characterIndicator'>
      <div
        style={{ width: charIndicatorProgress }}
        class='isl-inputNote-characterIndicator_progress'
      >
        <div
          style={{ width: charIndicatorExcess }}
          class='isl-inputNote-characterIndicator_excess'
        />
      </div>
    </div>
  );
}
