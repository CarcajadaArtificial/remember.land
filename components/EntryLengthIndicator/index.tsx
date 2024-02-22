interface iEntryLengthIndicator {
  length: number;
}

export default function EntryLengthIndicator(props: iEntryLengthIndicator) {
  const { length } = props;
  const maxLength = 280;

  const charIndicatorProgress = length > 0
    ? `${(length / maxLength) * 100}%`
    : '0%';
  const charIndicatorExcess = length > maxLength
    ? `${((props.length - maxLength) / maxLength) * 100}%`
    : '0%';

  return (
    <div class='isl-EntryInput-characterIndicator'>
      <div
        style={{ width: charIndicatorProgress }}
        class='isl-EntryInput-characterIndicator_progress'
      >
        <div
          style={{ width: charIndicatorExcess }}
          class='isl-EntryInput-characterIndicator_excess'
        />
      </div>
    </div>
  );
}
